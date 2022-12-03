export default {
    dialect: 'mysql',
    host: 'localhost',
    username: 'Helder',
    password: '12345',
    database: 'teste',
    define: {
        timestamps: true,
        underscored: true,
    },
    query: {raw: true}
}