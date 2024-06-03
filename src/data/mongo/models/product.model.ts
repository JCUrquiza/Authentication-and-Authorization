import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    available: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }

});

// En transform: function -> NO USAR UNA FUNCIÓN DE FLECHA porque 
// es necesario que apunte a este objeto y no al contexto que se 
// encuantra fuera de la función.
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id;
    },
});

export const ProductModel = mongoose.model('Product', productSchema);

