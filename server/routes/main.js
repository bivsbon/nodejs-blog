const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Reader = require('../models/Reader');
const Event = require('../models/Event');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const NAMES = ["Abby","Abigail","Ada","Addison","Adelaide","Adele","Adora","Adriana","Agatha","Agnes","Aileen","Alaina","Alanna","Alberta","Albina","Aleana","Alex","Alexa","Alexandra","Alexandria","Alexis","Alice","Alicia","Alisha","Alison","Alma","Alvina","Alyson","Amanda","Amber","Amelia","Amy","Ana","Andrea","Andrée","Andy","Angel","Angela","Angelica","Angelina","Angie","Anna","Annabelle","Annabeth","Anne","Annette","Annie","Antonia","April","Arabella","Arda","Ariana","Ariel","Ashley","Astrid","Aubrey","Audra","Audrey","Aurora","Autumn","Averil","Avis","Aviva","Azalea","Babette","Barb","Barbara","Beatrice","Beatrix","Beau","Becca","Becki","Becky","Belinda","Bella","Berenice","Bertha","Betsy","Bettina","Betty","Beverly","Bianca","Blair","Blake","Blanche","Bobbi","Bobby","Bonnie","Braden","Brandy","Brenda","Brianna","Bridget","Brielle","Brilliana","Bronwyn","Brooklyn","Brynlee","Bryony","Caden","Calla","Candy","Cara","Cari","Carina","Carissa","Carlena","Carlene","Carlie","Carly","Carmelita","Carol","Carol Ann","Carol Anne","Carole","Carolina","Caroline","Carolyn","Carrie Ann","Carrie Anne","Carroll","Carry","Cary","Casey","Cassidy","Cathleen","Cathy","Cecilia","Cecily","Celestia","Celia","Celinda","Chara","Charis","Charisse","Charity","Charla","Charle","Charlee","Charlene","Charley","Charli","Charlie","Charlotte","Charly","Charlyne","Charmaine","Chas","Chelsea","Cherry","Cheryl","Chloe","Chris","Christabel","Christi","Christina","Christine","Christy","Cindy","Claire","Clara","Clare","Claribel","Clarice","Clarissa","Claudia","Clementine","Clover","Cody","Colette","Colleen","Cora","Coral","Coraline","Cordelia","Corina","Courtney","Crystal","Cynthia","Daisy","Dana","Dani","Danielle","Danna","Daphne","Darla","Darlene","Davina","Dawn","Deanna","Deanne","Deb","Debbie","Deborah","Dede","Delia","Demetria","Demi","Denise","Destiny","Devon","Diamond","Diane","Dimity","Donna","Dora","Doreen","Dorothy","Drew","Dulcie","Ebony","Eden","Edith","Edna","Edris","Edwina","Effie","Eileen","Elaine","Eleanor","Elektra","Elisha","Eliza","Elizabeth","Ella","Elle","Ellen","Ellie","Ember","Emerald","Emily","Emma","Enid","Erika","Erin","Estelle","Esther","Esty","Ethel","Ethelreda","Eudora","Eva","Evan","Eve","Evelyn","Fabienne","Faith","Faye","Felicity","Fern","Finn","Fiona","Fleur","Florence","Frances","Francie","Francine","Frankie","Frida","Gage","Gail","Gemma","Genevieve","Georgene","Georgia","Georgiana","Gertie","Gertrude","Gia","Gina","Ginny","Giselle","Gladys","Glenda","Gloria","Glynis","Grace","Gwen","Gwenda","Gwendolen","Gwendoline","Gwendolyn","Gwyneth","Haisley","Haley","Hannah","Harmony","Harriet","Hayden","Hayley","Hazel","Heather","Heidi","Helen","Helena","Helene","Henrietta","Hero","Hester","Hilary","Hilda","Hodierna","Holly","Honor","Hope","Hunter","Ida","Imelda","Imogen","Ingrid","Iona","Irene","Iris","Irma","Isabel","Isabella","Isla","Ivy","Jacinta","Jack","Jackie","Jacqueline","Jacqui","Jade","Jaime","Jamie","Jan","Jana","Jane","Janee","Janelle","Janet","Janey","Janie","January","Jasmine","Jay","Jayda","Jayden","Jayne","Jaynie","Jean","Jeanie","Jeannie","Jemima","Jemma","Jenna","Jennifer","Jenny","Jerri","Jerry","Jess","Jessica","Jessie","Jill","Joan","Joanna","Joanne","Jodi","Jodie","Jody","Joelle","Joey","Johnny","Jolie","Jordan","Josephine","Josie","Joy","Joyce","Judith","Julia","Julianne","Julie","Juliet","June","Juniper","Juno","Justine","Kailey","Kalla","Kara","Karen","Karin","Karlee","Karlene","Karli","Karlie","Karly","Karolyn","Karrie","Karyn","Karyne","Kasey","Kate","Katey","Kathleen","Kathryn","Kathy","Katie","Katrina","Katy","Kay","Kayla","Kaylee","Kelly","Kelsey","Kierra","Kim","Kimberly","Kira","Kirsteen","Kirstin","Kitty","Krista","Kristen","Kristi","Kristin","Kristy","Kylie","Kyra","Lacey","Lana","Lanna","Lara","Larissa","Laura","Laurel","Lauren","Laurence","Lauretta","Laurie","Lauryn","Lavender","Leah","Leanne","Lee","Leila","Leisha","Lena","Lenna","Leona","Leonora","Leslie","Lettice","Lexi","Lila","Liliana","Lilibet","Lilibeth","Lilla","Lillian","Lillie","Lilly","Lily","Lina","Linda","Lindsay","Lindy","Lisa","Liza","Lizzie","Lois","Loraine","Lorelei","Lorena","Loretta","Lori","Lorinda","Lorna","Lorraine","Lottie","Lotty","Louella","Louisa","Louise","Lucia","Lucinda","Lucy","Lydia","Lyndsay","Lynnette","Lysette","Mabel","Mable","Macy","Madelaine","Madeleine","Madelyn","Madge","Madison","Madonna","Maggie","Magnolia","Mallory","Mandy","Mara","Marcia","Marcie","Margaret","Margie","Margo","Maria","Mariah","Marian","Marianne","Marie","Marigold","Marigold","Marilyn","Marina","Marissa","Marjorie","Marlene","Marsha","Marta","Martina","Mary","Mason","Matilda","Maud","Maude","Maura","Maureen","Mavis","Maxine","May","Maya","Mayola","McKenna","Meara","Medea","Megan","Mehitable","Mel","Melanie","Melina","Melinda","Melissa","Melody","Mercedes","Meredith","Merilyn","Merle","Merrilyn","Mia","Micah","Michele","Michelle","Mildred","Millicent","Millie","Mina","Mindi","Mindy","Minna","Minnie","Mira","Miranda","Miriam","Misty","Moira","Molly","Morgan","Muriel","Myra","Myrna","Myrtle","Nadia","Nadine","Naila","Nancy","Naomi","Narcissa","Natalie","Nathalie","Nena","Nettie","Netty","Nevaeh","Nia","Nicki","Nicola","Nicole","Nina","Noel","Noella","Noelle","Odette","Olive","Olivia","Opal","Paddy","Paige","Palmer","Pamela","Paris","Patience","Patrice","Patsy","Patty","Paula","Paulina","Pearl","Peggy","Penelope","Penny","Pepper","Perry","Persis","Petrina","Petula","Petunia","Philippa","Phoebe","Pixie","Poppy","Posy","Precious","Primrose","Priscilla","Rachel","Rain","Raleigh","Ramona","Randy","Reba","Rebecca","Regina","Rhiannon","Rhoda","Rhonda","Riley","Risa","Rita","Roberta","Robin","Romilda","Ronnie","Rosaleen","Rosalie","Rosalind","Rosalyn","Rosamund","Rose","Rosemary","Rosie","Ruby","Russi","Ruth","Sabrina","Sadie","Salma","Sam","Samantha","Sandi","Sandra","Sandy","Sapphire","Sarah","Scarlett","Selena","Selma","Serena","Shania","Sharla","Sharleen","Sharlene","Sharon","Shawna","Sheena","Shelley","Sherry","Sheryl","Shirley","Sibyl","Sid","Sidney","Sienna","Simone","Sky","Skyler","Sophia","Sophie","Sorrel","Spring","Stacy","Stella","Stephanie","Stevie","Summer","Susan","Susanna","Susanne","Sutton","Suzanne","Syd","Sydney","Sylvia","Sylvie","Tabitha","Talitha","Tallulah","Tamara","Tammy","Tara","Taylor","Teresa","Terry","Thelma","Thomasina","Tiffany","Tigerlily","Tonja","Tonya","Tori","Tracy","Trisha","Trudy","Tyler","Tyra","Ursula","Val","Valarie","Valda","Valerie","Vanessa","Velma","Velvet","Venetia","Venus","Vera","Veronica","Vicky","Victoria","Vilma","Viola","Violet","Violette","Virginia","Vivian","Wanda","Waverly","Wendy","Whitney","Willow","Wilma","Winifred","Winnie","Winnifred","Winter","Yasmin","Yvette","Yvonne","Zelda","Zoe","Aaron","Ab","Abe","Abner","Abraham","Absalom","Ace","Adam","Addison","Adel","Adolf","Adrian","Adrien","Ælfweard","Aidan","Aidin","Al","Alan","Albert","Alec","Alex","Alexander","Alfred","Algernon","Alison","Alistair","Allan","Allen","Alvin","Amadeus","Ambrose","Anderson","Andrew","Andy","Angus","Anthony","Antony","Archibald","Archie","Arliss","Arlo","Armand","Armistead","Arnaut","Arnie","Arnold","Art","Arthur","Asher","Ashley","Ashton","August","Austen","Austin","Baron","Barry","Bart","Bartholomew","Basil","Bayard","Beau","Ben","Benedict","Benjamin","Benson","Beresford","Bernard","Bernie","Bert","Bertram","Bertrand","Bill","Billy","Blair","Blake","Bo","Bob","Bobby","Booth","Brad","Braden","Bradley","Bram","Bramwell","Branden","Brandon","Braxton","Brian","Bridger","Brock","Brody","Brooks","Bruce","Bruno","Bryan","Bubba","Bubby","Bud","Buddy","Burt","Burton","Butch","Byron","Caden","Caleb","Callum","Calvin","Cameron","Canute","Cardew","Carl","Carlie","Carlile","Carlisle","Carlton","Carroll","Carson","Cary","Casey","Cecil","Cedric","Chad","Chadwick","Chance","Chandler","Chandos","Charl","Charlee","Charles","Charley","Charli","Charlie","Charlton","Charly","Chas","Chase","Chaz","Chazz","Chester","Chet","Chip","Chris","Christian","Chuck","Chucky","Ciarán","Claire","Clare","Clarence","Clark","Claude","Clay","Clayton","Cletus","Cleve","Cliff","Clifford","Clifton","Clint","Clinton","Clinton","Clive","Clyde","Cody","Colby","Cole","Colin","Collin","Colman","Coloman","Colton","Connor","Conor","Conrad","Conway","Cooper","Corbin","Corey","Cosmo","Courtney","Craig","Curtis","Curtley","Cuthbert","Cwichelm","Cyrus","Dallas","Damian","Damien","Damon","Dan","Dana","Dane","Daniel","Danny","Darby","Darren","Darvin","Darwin","Dave","David","Davis","Davy","Dean","Delbert","Demetrius","Denis","Dennis","Denzel","Denzil","Deorwine","Derek","Derick","Derrick","Derwin","Des","Desmond","Dexter","Dick","Dickon","Dicky","Digby","Dirk","Dobie","Dom","Domenic","Dominic","Don","Donald","Dorian","Doug","Dougie","Douglas","Drake","Drew","Drummond","Duane","Duke","Duncan","Dustin","Dutton","Dwayne","Dwight","Dylan","Eadwulf","Ealdwulf","Eardwulf","Earl","Ebenezer","Ed","Eddie","Eden","Edgar","Edison","Edmund","Edward","Edwin","Elbert","Elias","Elijah","Elisha","Elliot","Ellwood","Elmer","Elmo","Elon","Elton","Elvis","Emanuel","Emil","Emmanuel","Emmett","Emo","Enoch","Erastus","Eric","Ernest","Ernie","Ethan","Eugene","Eustace","Evan","Evelyn","Eversley","Ezekiel","Ezra","Fabian","Felix","Finn","Fletcher","Flint","Flynn","Flynn","Ford","Forrest","Francis","Frank","Frankie","Franklin","Fred","Freddy","Frederic","Frederick","Frederick","Gabe","Gabriel","Gage","Gale","Galton","Garrett","Garth","Gary","Gavin","Gaylord","Geoffrey","George","Gerald","Gerard","Gideon","Gilbert","Giles","Giovanni","Glen","Godfrey","Gorden","Gordon","Graham","Grant","Grayson","Greg","Gregory","Griffin","Grover","Gulliver","Gunnar","Gunner","Gus","Guy","Hal","Hale","Hank","Hannibal","Harold","Harris","Harrison","Harry","Harvey","Harwood","Hayden","Hector","Hedworth","Henry","Herbert","Herman","Herschel","Hervey","Heywood","Hilary","Holbrook","Holden","Homer","Hope","Horace","Horatio","Howard","Hubert","Hudson","Hugh","Hugo","Humphrey","Hunter","Ian","Iggy","Ike","Increase","Ingram","Isaac","Isaiah","Isidore","Israel","Ivor","Ivy","Jace","Jack","Jackie","Jackson","Jacob","Jaden","Jaime","Jake","James","Jameson","Jamie","Jared","Jarrod","Jason","Jasper","Jaxon","Jay","Jayce","Jayden","Jaylon","Jayson","Jeb","Jedediah","Jeff","Jefferson","Jeffery","Jeffrey","Jemmy","Jeremiah","Jeremy","Jermaine","Jerome","Jerry","Jess","Jesse","Jet","Jethro","Jim","Jimmy","Job","Jodie","Joe","Joel","Joey","John","Johnny","Johnson","Jolyon","Jon","Jonah","Jonas","Jonathan","Jonni","Jonnie","Jonny","Jordan","Jordie","Jordy","Joseph","Josh","Joshua","Josiah","Julian","Julien","Julius","Juno","Justin","Kaden","Kane","Karl","Kay","Keith","Kelly","Kelsey","Kelvin","Ken","Kendrick","Kenneth","Kenny","Kent","Kermit","Kevin","Kian","Kim","Kimble","Kirk","Kurt","Kyan","Kyle","Lance","Landon","Lanny","Larry","Laurence","Laurie","Lawrence","Lawton","Leamon","Lee","Lenny","Leo","Leon","Leonard","Leopold","Leroy","Leslie","Lester","Levi","Lewis","Liam","Lincoln","Lindor","Lindsay","Linus","Lionel","Logan","Louis","Lucas","Luke","Luther","Lyle","Lyndsay","Mac","Maddox","Madison","Mainard","Malachi","Malcolm","Mandy","Manuel","Marcus","Mario","Mark","Marshall","Martin","Marvin","Mason","Matt","Matthew","Matthias","Maurice","Maverick","Max","Maximilian","Maynard","Mel","Melville","Melvin","Melvyn","Merle","Merlin","Micah","Mike","Mikey","Miles","Milo","Mitch","Mitchell","Moe","Montgomery","Montie","Monty","Morgan","Mort","Mortimer","Morty","Moses","Murray","Myron","Nate","Nathan","Nathanael","Nathaniel","Ned","Nehemiah","Neil","Nelson","Nestor","Newt","Newton","Niall","Nicholas","Nick","Nicodemus","Nicolas","Nigel","Niles","Noah","Noam","Noel","Nolan","Norm","Norman","Nowell","Obadiah","Odin","Oliver","Ollie","Orion","Orlando","Orville","Osbert","Oscar","Osric","Oswald","Otis","Otto","Owen","Paddy","Palmer","Paris","Patrick","Patsy","Patty","Paul","Peleg","Percival","Percy","Perry","Pete","Peter","Philip","Phillipps","Phineas","Poe","Porter","Posy","Preston","Quentin","Quincy","Rafe","Raife","Raleigh","Ralph","Ralphie","Ramsey","Randall","Randi","Randolph","Randy","Raphael","Rathbone","Ray","Raymond","Reese","Reggie","Reginald","Rembrandt","Rendell","Renssalaer","Reuben","Rex","Reynold","Rhett","Rich","Richard","Richie","Rick","Ricky","Riley","Rob","Robbie","Robert","Robin","Roderick","Rodger","Rodney","Roger","Rogers","Roland","Roman","Ron","Ronald","Ronnie","Roscoe","Ross","Rowland","Rudolph","Rudy","Rufus","Rupert","Russ","Russell","Ryan","Ryder","Sam","Sammy","Samson","Samuel","Sanford","Saul","Sawyer","Scott","Sean","Sebastian","Seth","Shahaf","Shane","Shaun","Shawn","Shayne","Shepherd","Sid","Sidney","Sigmund","Simon","Sky","Skyler","Sol","Solomon","Spencer","Stan","Stanford","Stanley","Stefan","Stephen","Stetson","Steve","Stevie","Stewart","Stuart","Swaine","Syd","Sydney","Sylvester","Tanner","Taran","Taylor","Tazewell","Ted","Teddy","Terence","Terry","Thaddeus","Theo","Theodore","Thomas","Thor","Tim","Timmy","Timothy","Tobias","Toby","Tod","Todd","Toddy","Tom","Tommie","Tommy","Tony","Tracy","Travis","Tregonwell","Trent","Trevor","Trey","Tristan","Troy","Truman","Tucker","Tucker","Tyler","Tyrone","Tyson","Ultan","Ulysses","Uriah","Val","Valentine","Vernon","Vic","Vicary","Victor","Vince","Vincent","Vinny","Vivian","Wade","Wadsworth","Walden","Waldo","Walker","Wallace","Wally","Walt","Walter","Warren","Waverly","Wayne","Wells","Wes","Wesley","Whitney","Wilber","Wilbert","Wilbur","Wilf","Wilfred","Wilfried","Wilhelm","Will","Willard","William","Willy","Wilmon","Wilson","Winnie","Winston","Wolfgang","Woodrow","Woodruff","Woody","Wyatt","Wyndham","Xander","Xavier","Zachary","Zack"]
const readerLayout = '../views/layouts/main';
const jwtSecret2 = process.env.JWT_SECRET2;

/**
 * 
 * Check Login
*/
const authMiddleware = (req, res, next ) => {
  const token = req.cookies.readerToken;
  if(!token) {
    // return res.status(401).json( { message: 'Unauthorized'} );
    next()
  } else {
    try {
      const decoded = jwt.verify(token, jwtSecret2);
      req.readerId = decoded.readerId;
      req.readerName = decoded.readerName;
      next();
    } catch(error) {
      next()
    }
  }
}

/**
 * GET /
 * HOME
*/
router.get('', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { created_at: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/',
      readerName: req.readerName,
      readerId: req.readerId,
    });

  } catch (error) {
    console.log(error);
  }

});

// router.get('', async (req, res) => {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple Blog created with NodeJs, Express & MongoDb."
//   }

//   try {
//     const data = await Post.find();
//     res.render('index', { locals, data });
//   } catch (error) {
//     console.log(error);
//   }

// });


/**
 * GET /
 * Post :id
*/
router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    }

    res.render('post', { 
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});


/**
 * POST /
 * Post - searchTerm
*/
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Seach",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * POST /
 * Post - login
*/
router.post('/login-reader', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const reader = await Reader.findOne( { username } );

    if(!reader) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const isPasswordValid = await bcrypt.compare(password, reader.password);

    if(!isPasswordValid) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const token = jwt.sign({ readerId: reader._id, readerName: reader.name}, jwtSecret2 );
    res.cookie('readerToken', token, { httpOnly: true });
    res.redirect('/');

  } catch (error) {
    console.log(error);
  }
});


/**
 * POST /
 * Admin - Register
*/
router.post('/register-reader', async (req, res) => {
  try {
    const { username, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const reader = await Reader.create({ username, password:hashedPassword, name:name});
      res.status(201).json({ message: 'Reader Created', reader });
    } catch (error) {
      if(error.code === 11000) {
        res.status(409).json({ message: 'Reader already in use'});
      }
      res.status(500).json({ message: 'Internal server error'})
    }

  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * About
*/
router.get('/about', (req, res) => {
  res.render('about', {
    currentRoute: '/about'
  });
});


/**
 * GET /
 * Reader - Login Page
*/
router.get('/login', async (req, res) => {
  try {
    const locals = {
      title: "Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    res.render('login', { locals, layout: readerLayout, currentRoute: '/' });
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Reader - Login Page
*/
router.get('/recommend', async (req, res) => {
  try {
    const locals = {
      title: "Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    res.render('login', { locals, layout: readerLayout, currentRoute: '/' });
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Reader - History test Page
*/
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }
    const event_list = await Event.find()
    .where("user_id")
    .equals(req.readerId)
    .exec()
    console.log(event_list.map((event) => event.post_id))

    // id_list = ["65b33a9d15bfee61b47aed77", "65b33a9f15bfee61b47aed7d"]

    const data = await Post.find()
    .where("_id").in(event_list.map((event) => event.post_id))
    .sort("-created_at")
    .exec();

    res.render('history', { 
      locals,
      data,
      currentRoute: '/',
      readerName: req.readerName,
      readerId: req.readerId,
    });

  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Reader Logout
*/
router.get('/logout-reader', (req, res) => {
  res.clearCookie('readerToken');
  //res.json({ message: 'Logout successful.'});
  res.redirect('/');
});


/**
 * GET /
 * Reader Logout
*/
router.get('/generate-users', (req, res) => {
  try {
    NAMES.forEach( async (name) => {
      const hashedPassword = await bcrypt.hash("123", 10);
  
      try {
        const reader = await Reader.create({ username:name.toLowerCase(), password:hashedPassword, name:name});
      } catch (error) {
        if(error.code === 11000) {
          res.status(409).json({ message: 'Reader already in use'});
        }
        res.status(500).json({ message: 'Internal server error'})
      }
    })
  } catch (error) {
    console.log(error);
  }
});


// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic."
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan."
//     },
//   ])
// }

// insertPostData();


module.exports = router;
