// Importa Mongoose
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define el esquema para un usuario
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Método para encriptar la contraseña antes de guardar un nuevo usuario
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Encripta la contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar la contraseña proporcionada con la almacenada
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Crea un modelo basado en el esquema
const User = mongoose.model('User', userSchema);

// Función para crear un nuevo usuario
export const createUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

// Función para encontrar un usuario por su nombre de usuario
export const findUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
};

// Función para encontrar un usuario por su ID
export const findUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error('Error finding user by ID: ' + error.message);
    }
};

// Función para actualizar un usuario
export const updateUser = async (id, updateData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Función para eliminar un usuario
export const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};
