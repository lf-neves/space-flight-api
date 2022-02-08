import { Schema, model } from 'mongoose'

const ArticleSchema = new Schema({
    id: Number,
    featured: Boolean,
    title: String,
    url: String,
    imageUrl: String,
    summary: String,
    publishedAt: String,
    launches: Array,
    events: Array,
    newsSite: String,
});

export default model('Article', ArticleSchema);