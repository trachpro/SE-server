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
        allowNull: false,
        validate: {
            len: [5,25],
            is: {
                args: [/^[a-zA-Z][\w-\.]{1,25}$/i],
                msg:"Username must start by a letter and can contain letters, digits and some special character (.-_)."
            },
            notEmpty: {
                args: [true],
                msg: "Username is required"
            }
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: {
                args: [/^[A-Za-z][a-zA-Z ]{0,25}$/i],
                msg: "Name field must start by a letter and allow only letters and space"
            },
            notEmpty: {
                args: [true],
                msg: "Name is required"
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: "This email is already in use!"
        },
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Not a valid email format"
            }
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: [true],
                msg: "Password is required"
            }
        }
    },
    profilePicture: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    deletedAt: Sequelize.DATE,
    status: Sequelize.INTEGER
    }, {
    timestamps: false
    });
    return User;
}
