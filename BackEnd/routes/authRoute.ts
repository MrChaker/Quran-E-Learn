import express, { Errback } from 'express';
const authRoute = express.Router();
import jwt, { Secret } from 'jsonwebtoken';
import Lesson from '../models/lesson';
import User from '../models/user';
import { uniqueValidator } from '../Utils/authErrors';

authRoute.post('/sign', async (req, res) => {
  const hasToBeUnique = await uniqueValidator(
    {
      email: req.body.email,
      name: req.body.name,
    },
    User
  );
  if (hasToBeUnique) {
    res.status(400).json({ SignErrors: hasToBeUnique });
  }
  // getting surah el fatiha for new students
  const firstLesson = await Lesson.findOne(
    { title: 'سورة الفاتحة' },
    { _id: 1 }
  );

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    sex: req.body.sex,
    image: req.body.sex == 'male' ? '/male.png' : '/female.png',
    password: req.body.password,
    phone: req.body.phone,
    Slessons: [firstLesson._id],
  });

  const user = await newUser.save().catch((err: Errback) => {
    console.log('Error: ', err);
    res.status(500).json({ err });
  });
  const jwtSecret: Secret = process.env.JWT_SECRET || '';
  const jwtToken = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
    expiresIn: 60 * 60 * 24 * 3,
  });
  res.cookie('jwt', jwtToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 3 * 1000,
  });
  res.status(200).send({ success: true });
});

authRoute.post('/loginAPI', async (req, res) => {
  const { email, password }: { email: string; password: string } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ LogError: 'البيانات خاطئة ، أعد المحاولة' });

  const userLog = await User.loginAPI(email, password).catch((error: Error) => {
    console.log(error);
    return res.status(400).json({ LogError: 'البيانات خاطئة ، أعد المحاولة' });
  });
  const jwtSecret: Secret = process.env.JWT_SECRET || '';

  const jwtToken = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
    expiresIn: 60 * 60 * 24 * 3,
  });
  res.cookie('jwt', jwtToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 3 * 1000,
  });
  res.status(200).send({ success: true });
});

authRoute.get('/logout', (req, res) => {
  res.cookie('session', '', { maxAge: 0.0001 });
  res.cookie('session.sig', '', { maxAge: 0.0001 });
  res.cookie('jwt', process.env.JWT_SECRET, { maxAge: 0.0001 });

  res.redirect('/auth/login');
});

authRoute.get('/user', (req, res) => {
  const jwtSecret: Secret = process.env.JWT_SECRET || '';
  jwt.verify(
    req.cookies.jwt,
    jwtSecret,
    async (err: any, decodedToken: any) => {
      if (err) {
        console.log(err);
        res.status(401).send({ err: 'UnAuthenticated' });
      } else {
        const user = await User.findOne({ email: decodedToken.email }).catch(
          (err) => console.log(err)
        );
        const userObj = {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
          sex: user.sex,
          roles: user.roles,
        };
        res.status(200).json(
          user.roles.teacher
            ? { ...userObj, lessons: user.lessons, students: user.students }
            : {
                ...userObj,
                teacher: user.teacher,
                Slessons: user.Slessons,
              }
        );
      }
    }
  );
});

export default authRoute;
