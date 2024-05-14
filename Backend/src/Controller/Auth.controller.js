// const { UserModel } = require("../Model/user.model");

// const userRegister = async (req, res) => {
//   const {name, email, password, stream, subject, role  } = req.body;
//   const saltRounds = 10;
//   try {
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const isUser = new UserModel({
//       name, email, password:hashedPassword, stream, subject, role 
//     });
//     await isUser.save();
//     res.status(201).send({ error: false, items: isUser });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).send({ error: true, message: error.message });
//   }
// };



// const userLogin = async (req, res) => {
//   const { email, password } = req.body;
//   const saltRounds = 10;
//   try {
//     const isUserExists = await UserModel.findOne({ email });
//     if (!isUserExists) {
//       return res
//         .status(401)
//         .send({ error: true, message: "Given credentials are invalid" });
//     }

//     const checkPassword = await bcrypt.compare(
//       password,
//       isStudentExists.password
//     );
//     if (checkPassword) {
//       const accessToken = jwt.sign(
//         {
//           data: { email: isUserExists.email, name: isUserExists.name },
//         },
//         process.env.SECRET_KEY,
//         { expiresIn: "1h" }
//       );

//       return res.status(201).send({ error: false, accessToken });
//     } else {
//       return res
//         .status(401)
//         .send({ error: true, message: "Given credentials are invalid" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).send({ error: true, message: error.message });
//   }
// };
// module.exports = {

//   userRegister,
//   userLogin,
// };

const { UserModel } = require('../Model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new UserModel({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
