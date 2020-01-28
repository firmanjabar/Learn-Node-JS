// Trade off between query performance and consistency

// Using Reference (Normalization, like RDBs) -> CONSISTENCY
let author = {
    name: "firman"
}

let course = {
    author: "id"
}

// Using embedded document (Denormalization) -> PERFORMANCE
let course = {
    author: {
        name: "firman jabar"
    }
}

// Hybrid approach
let author = {
    name: 'firman',
    // 50 other properties
}

let course = {
    author: {
        id: 'ref id',
        name: 'firman'
    }
}