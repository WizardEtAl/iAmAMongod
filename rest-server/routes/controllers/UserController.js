const Users = require('../../DB/Models/UserModel');
const bcrypt = require('bcrypt');


const UserController = {
  
  SignUp: (req, res) => {
    console.log('here is req.body', req.body);

    bcrypt.genSalt(10)
      .then( salt => {
        bcrypt.hash(req.body.password, salt)
          .then ( hashedPassword => {
            const user = new Users({
              username: req.body.username, 
              password: hashedPassword
            });
            user.save()
              .then( data => {
                console.log('signup data; ', data);
                res.status(201).send('Success');
              })
              .catch( err => {
                res.status(400).send('Signup failed');
              });
          })
          .catch( err => {
            console.log(err);
          });
      })
      .catch( err => {

      });
    // const user = new Users({
    //   username: req.body.username, 
    //   password: req.body.password
    // });

    // user.save()
    //   .then( data => {
    //     console.log('signup data:', data);
    //     res.status(201).send('Success');
    //   })
    //   .catch( err => {
    //     console.log('signup error:', err);
    //     res.status(400).send('signup failed');
    //   });
  },

  Login: (req, res) => {
    console.log('here is req.params', req.params);
    Users.find({ username: req.params.username})
      .then( data => {
        if (data.length) {
          bcrypt.compare(req.params.password, data[0].password, (err, result) => {
            result ? 
              res.status(202).send(data[0]._id)
              :
              res.status(200).send('invalid password');
          });
        } else {
          res.status(200).send('no user found');
        }
        //   if (data[0].password === req.params.password) {
        //     console.log('successful login ', data[0]);
        //     res.status(202).send(data[0]._id);
        //   }
        //   res.status(200).send('incorrect password');
        // }
        // res.status(400).send('no user found!');
      })
      .catch( err => {
        console.log('login failed', err);
        res.status(400).send('login failed');
      });
  }


};

module.exports = UserController;