module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('users', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: "This username is already in use!"
        },  
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: "This email is already in use!"
        },
    },
    password: Sequelize.STRING,
    profilePicture: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    status: Sequelize.INTEGER
    }, {
    timestamps: false
    });
    return User;
}
