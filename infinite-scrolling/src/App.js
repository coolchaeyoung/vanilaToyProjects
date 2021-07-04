import { request } from "./api/api.js";
import FilterContainer from "./components/FilterContainer.js";
import Loading from "./components/Loading.js";
import PostsContainer from "./components/PostsContainer.js";

export default class App {
  constructor($app) {
    this.state = {
      isLoading: false,
      posts: [],
      renderPosts: [],
      page: 1,
    };

    const h1 = document.createElement("h1");
    h1.textContent = "My Blog";
    $app.appendChild(h1);

    this.filterContainer = new FilterContainer({
      $app,
      onChange: (value) => {
        const renderPosts = this.state.posts.filter(
          (post) => post.title.includes(value) || post.body.includes(value)
        );
        this.setState({
          ...this.state,
          renderPosts,
        });
      },
    });
    this.postsContainer = new PostsContainer({
      $app,
      initState: this.state.renderPosts,
    });
    this.loading = new Loading({ $app, initState: this.state.isLoading });

    this.init();
    window.addEventListener("scroll", async () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight === scrollHeight) {
        this.setState({
          ...this.state,
          isLoading: true,
        });
        try {
          const newPosts = await request(this.state.page);
          this.setState({
            ...this.state,
            page: this.state.page + 1,
            posts: [...this.state.posts, ...newPosts],
            renderPosts: [...this.state.renderPosts, ...newPosts],
            isLoading: false,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
  setState(nextState) {
    this.state = nextState;
    this.postsContainer.setState(this.state.renderPosts);
    this.loading.setState(this.state.isLoading);
  }
  async init() {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    try {
      const newPosts = await request(this.state.page);
      this.setState({
        ...this.state,
        page: this.state.page + 1,
        posts: [...newPosts],
        renderPosts: [...newPosts],
        isLoading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
