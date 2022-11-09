import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import {addEventToDeletePost, addEventToUpdatePost, eventToPopulatePostUpdateFields} from "./AdminIndex.js";

const USER_URI = "http://localhost:8080/api/users/";



export default function Profile(props) {
    console.log(props)
    // language=HTML
    return `
        <header>
            <h1>PROFILE</h1>
        </header>
        <main>
            <div class="container-fluid m-0">
                <div class="row ">
                    
               
                <div class="profile-info col-12 col-md-4">
                    <div class="profile-image mx-auto m-md-1">
                        <img src="https://picsum.photos/275" alt="profile-pic">
                    </div>
                    <div class="profile-id" data-id="${props.users.id}"></div>
                    <div class="profile-username" data-username="${props.users.username}">
                        <h3 class="m-1">${props.users.username}</h3>
                    </div>
                    <div class="profile-email m-1">
                        ${props.users.email}
                    </div>
                    <div class="profile-role m-1">
                        ${props.users.role}
                    </div>

                    <hr>
                    
                    <div class="profile-password-change-form m-1">
                        <form>
                            <label for="password-new" class="form-label">New Password</label>
                            <input type="password" id="password-new" class="form-control" aria-describedby="passwordHelpBlock">
                            <button type="button" class="btn btn-primary mt-3" id="password-update-btn">Update password</button>
                        </form>
                    </div>
                </div>
                
                <div class="profile-posts col-12 offset-md-1 offset-lg-0 col-md-7 col-lg-8">
                    <div id="update-post-form" class="m-1">
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
                    <hr>
                    ${props.users.posts.map(post => 
                            `
                            
                            <div class="card my-3 post-info-box" data-id="${post.id}" data-title="${post.title}" data-content="${post.content}" data-categories="${post.categories}">
                                <div class="card-header background-card-dark d-flex justify-content-between">
                                    <h3>${post.title}</h3>
                                    <div class="author-categories">
                                        <div class="author">Author: ${props.users.username}</div>
                                        <div class="categories">Categories: ${post.categories.map(category => category.name)}</div>
                                    </div>
                                </div>
                                <div class="card-body background-card-dark">
                                    <p class="card-text">${post.content}</p>
                                </div>
                            </div>
                            
                            `)
                            .join('')}
                </div>
                </div>    
            </div>
        </main>
    `;
}

export function UserEvents() {
    addListenerToUpdatePassword();
    eventToPopulatePostUpdateFields();
    addEventToUpdatePost('/profile');
    addEventToDeletePost('/profile');
}

function addListenerToUpdatePassword() {
    $('#password-update-btn').click(function (){
        const userId = $('.profile-id').data('id');
        const username = $('.profile-username').data('username');
        const currentPassword = $('#password-current').val();
        const newPassword = $('#password-new').val();

        console.log(username)
        console.log(currentPassword)
        console.log(newPassword)

        const requestObject = {
            method: "PUT",
            headers: getHeaders(),
            body: newPassword
        }

        fetch(`${USER_URI}${userId}/updatePassword`, requestObject).then(function (){
            console.log("Updating user: " + username + "'s password to: " + newPassword)
        }).catch(function (){
            console.log("error")
        }).finally(function (){
            createView("/profile")
        })
    });
}