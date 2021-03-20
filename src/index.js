import {HeaderComponent} from './components/header.component';
import {NavigationComponent} from './components/nav.component';
import {CreateCompomemt} from './components/create.component';
import {PostsCompomemt} from './components/posts.component';
import {FavoriteCompomemt} from './components/favorite.component';
import {LoaderComponent} from './components/loader.component';

new HeaderComponent('header');
const nav = new NavigationComponent('navigation');
const create = new CreateCompomemt('create');
const loader = new LoaderComponent('loader');

const posts = new PostsCompomemt('posts', loader);
const favorite = new FavoriteCompomemt('favorite');


// console.log(nav)


nav.regiserTabs([
    {name: 'posts', component: posts},
    {name: 'create', component: create},
    {name: 'favorite', component: favorite}
])