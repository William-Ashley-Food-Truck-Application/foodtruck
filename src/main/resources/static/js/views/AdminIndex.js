import {getHeaders} from "../auth.js";
import createView from "../createView.js";

const USER_URI = 'http://localhost:8080/api/users';
const POST_URI = 'http://localhost:8080/api/posts';

export default function Admin(props) {
    console.log(props)
    return `
        <header class="row justify-content-evenly">
        <h4>update section</h4>
            <div id="update-user-form" class="m-1 col-5">
                <form>
                

                    <div class="row">
                        <div class="col">
                            <label for="user-username">Username</label>
                            <input type="text" name="username" id="user-username" class="background-card-dark create-input">
                        </div>
                        <div class="col">
                        <label for="user-email">Email</label>
                            <input type="text" name="email" id="user-email" class="background-card-dark create-input">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="user-role">Role</label>
                            <input type="text" name="role" id="user-role" class="background-card-dark create-input">
                        </div>
                        <div class="col">
                        <label for="user-id">Id</label>
                            <input type="text" name="id" id="user-id" class="background-card-dark create-input">
                        </div>
                    </div>
                    <div class="m-1 d-flex justify-content-end">
                        <button class="btn delete-user-btn btn-danger mx-3" type="button">Delete</button>
                        <button class="btn update-user-btn btn-success mx-3" type="button">Update</button>
                    </div>
                            
                </form>
            </div>
            <div id="update-post-form" class="m-1 col-5">
                <form>
                    <div class="form-group">
                        <div class="row">
                            <div class="col">
                                <label for="post-title">Title</label>
                                <input type="email" name="test" id="post-title" class="background-card-dark create-input no-focus">
                            </div>
                            <div class="col">
                                <label for="post-id">Id</label>
                                <input type="email" name="test" id="post-id" class="background-card-dark create-input no-focus">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="post-content">Content</label>
                        <!--                        <textarea class="form-control background-card-dark" id="post-content" rows="3"></textarea>-->
                        <textarea name="test" id="post-content" class="background-card-dark create-input no-focus"></textarea>
                    </div>
<!--                    <label for="categories-select">Categories</label>-->
<!--                    <div class="form-group d-flex justify-content-between" id="categories-select">-->
<!--                        <select id="categories-list-1" class="form-select" multiple size="4" aria-label="size 3 select example">-->
<!--                            <option value="music">Music</option>-->
<!--                            <option value="sports">Sports</option>-->
<!--                            <option value="food">Food</option>-->
<!--                            <option value="drink">Drink</option>-->
<!--                        </select>-->
<!--                        <select id="categories-list-2" class="form-select" multiple size="4" aria-label="size 3 select example">-->
<!--                            <option value="art">Art</option>-->
<!--                            <option value="outdoors">Outdoors</option>-->
<!--                            <option value="business">Business</option>-->
<!--                            <option value="culture">Culture</option>-->
<!--                        </select>-->
<!--                        <select id="categories-list-3" class="form-select" multiple size="4" aria-label="size 3 select example">-->
<!--                            <option value="entertainment">Entertainment</option>-->
<!--                            <option value="politics">Politics</option>-->
<!--                            <option value="science">Science</option>-->
<!--                            <option value="nature">Nature</option>-->
<!--                        </select>-->
<!--                    </div>-->
                    <div class="form-group mt-2 d-flex justify-content-between">
                        <button class="btn btn-danger mx-3" type="button" id="postDeleteBtn">delete</button>
                        <button class="btn btn-success mx-3" type="button" id="postUpdateBtn">update</button>
                    </div>
                </form>
            </div>


            <hr class="mt-3" style="width: 91%; margin: auto">
        </header>
        <main class="row">
            <div id="all-users" class=" col-12 col-md-6">
            ${props.users.map(user =>
                `
                
                <div class="card text-white background-card-dark m-1 user-info-box" style="width: 100%; font-size: .75em" data-id="${user.id}" data-email="${user.email}" data-username="${user.username}" data-role="${user.role}">
                    <div class="card-body d-flex justify-content-between">
                      <div class="card-text" style="width: 45%">
                        <div class="user-email">Email: ${user.email}</div>
                        <div>Username: ${user.username}</div>
                      </div>
                      <div class="card-text" style="width: 20%">
                        <div>Role: ${user.role}</div>
                        <div>Id: ${user.id}</div>
                      </div>
                      <div class="card-text" style="width: 35%">
                        <div>Create Date: ${user.createdAt}</div>
                        <div>Posts: ${user.posts.length}</div>
                      </div>  
                    </div>
                </div>
                `
                ).join('')}
                  
            </div>
            
            <div id="all-posts" class="col-12 col-md-6">
            ${props.posts.map(post => 
                `
                <div class="card text-white background-card-dark m-1 post-info-box" style="width: 100%; font-size: .75em" data-id="${post.id}" data-title="${post.title}" data-content="${post.content}" data-categories="${post.categories}">
                    <div class="card-body d-flex justify-content-between">
                    <div class="card-text" style="width: 10%">
                        <div>ID: ${post.id}</div>          
                      </div>
                      <div class="card-text" style="width: 30%">
                        <div>title: ${post.title}</div>
                        <div>author/Id: ${post.author.username}/${post.author.id}</div>
                      </div>
                      <div class="card-text" style="width: 60%">
                        <div>content: ${post.content}</div>          
                      </div>
                    </div>
                </div>
                `)
                .join('')}
            </div>
        </main>
    `;
}

export function AdminEvents() {
    addEventToUpdateUser()
    addEventToDeleteUser()
    addEventToUpdatePost('/admin')
    addEventToDeletePost('/admin')
    eventToPopulateUserUpdateFields()
    eventToPopulatePostUpdateFields()
}

function addEventToUpdateUser() {
    $('.update-user-btn').click(function (){
        console.log('clicked update')
        const id = $('#user-id').val();
        const username = $('#user-username').val();
        const email = $('#user-email').val();
        const role = $('#user-role').val();

        const updatedUser = {
            username,
            email,
            role
        }
        console.log(updatedUser);
        const requestObject = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(updatedUser)
        }

        fetch(`${USER_URI}/${id}`, requestObject).then(function (){
            console.log('user updated');
        }).catch(function (){
            console.log("error")
        }).finally(function (){
            createView("/admin");
        })
    });
}

function addEventToDeleteUser() {
    $('.delete-user-btn').click(function (){
        const id = $('#user-id').val();
        const requestObject = {
            method: "DELETE",
            headers: getHeaders()
        }

        fetch(`${USER_URI}/${id}`, requestObject).then(function (){
            console.log('user deleted');
        }).catch(function (){
            console.log("error")
        }).finally(function (){
            createView("/admin");
        })
    });
}

function eventToPopulateUserUpdateFields(){
    $('.user-info-box').click(function (){
        const userId = $(this).data("id");
        const userEmail = $(this).data("email");
        const userUsername = $(this).data('username');
        const userRole = $(this).data('role');

        $('#user-id').val(userId);
        $('#user-email').val(userEmail);
        $('#user-username').val(userUsername);
        $('#user-role').val(userRole);
    })
}




export function addEventToUpdatePost(uri) {
    $('#postUpdateBtn').click(function (){
        console.log('clicked update')
        const id = $('#post-id').val();
        const title = $('#post-title').val();
        const content = $('#post-content').val();


        const updatedPost = {
            title,
            content
        }
        console.log(updatedPost);
        const requestObject = {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(updatedPost)
        }

        fetch(`${POST_URI}/${id}`, requestObject).then(function (){
            console.log('user updated');
        }).catch(function (){
            console.log("error")
        }).finally(function (){
            createView(uri);
        })
    });
}

export function eventToPopulatePostUpdateFields(uri){
    $('.post-info-box').click(function (){
        const postId = $(this).data("id");
        const postTitle = $(this).data("title");
        const postContent = $(this).data('content');

        $('#post-id').val(postId);
        $('#post-title').val(postTitle);
        $('#post-content').val(postContent);
    })
}

export function addEventToDeletePost(uri) {
    $('#postDeleteBtn').click(function (){
        const id = $('#post-id').val();
        const requestObject = {
            method: "DELETE",
            headers: getHeaders(),
        }

        fetch(`${POST_URI}/${id}`, requestObject).then(function (){
            console.log('post deleted');
        }).catch(function (){
            console.log("error")
        }).finally(function (){
            createView(uri);
        })
    });
}