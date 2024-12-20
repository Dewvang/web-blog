import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



let posts = [
    {
        title: "Welcome to My Blog",
        content: "This is the first post. Feel free to edit or delete it."
    }
];

app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.post('/add', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const postId = req.params.id;
    posts.splice(postId, 1);  
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    res.render('edit', { post, id: postId });
});

app.post('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    posts[postId] = { title, content }; 
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
