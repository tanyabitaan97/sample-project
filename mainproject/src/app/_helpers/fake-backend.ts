import { Injectable } from '@angular/core';

//importing system defined http classes & HTTP_INTERCEPTORS thats enables this calls to intercept http requests
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

//importing rxjs functions
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// get a ref to the array in local storage that stored registered users
let users:any[]=[];

let userByEmailId:any[]=[
    {"emailId":"abc@gmail.com","userPhoto":"./assets/img1.png","status":"unblock","role":"user"},
    {"emailId":"def@gmail.com","userPhoto":"./assets/img2.png","status":"unblock","role":"admin"},
    {"emailId":"ghi@gmail.com","userPhoto":"./assets/img3.png","status":"unblock","role":"user"},
    {"emailId":"xyz@gmail.com","userPhoto":"./assets/img4.png","status":"unblock","role":"user"},
    {"emailId":"pqr@gmail.com","userPhoto":"./assets/img4.png","status":"unblock","role":"user"},
];

let postByUserId:any[]=[
    {
        "emailId":"abc@gmail.com",
        "post":"Hi there!!Weather is super good.!!"
    }, 
    {
        "emailId":"abc@gmail.com",
        "post":"./assets/pic5.png"
    },{
        "emailId":"abc@gmail.com",
        "post":"You all are looking good!!"
    },
    {
        "emailId":"def@gmail.com",
        "post":"Almost there to finish my video game"
    },
    {
        "emailId":"def@gmail.com",
        "post":"./assets/pic6.png"
    },
    {
        "emailId":"ghi@gmail.com",
        "post":"You are almost done with work now lets play the game"
    },
    {
        "emailId":"ghi@gmail.com",
        "post":"./assets/pic7.png"
    }
]

let friendsByUserId=[{

    "emailId":"abc@gmail.com",
    "friendName":"ghi@gmail.com",
    "status":"Friend"

},{

    "emailId":"abc@gmail.com",
    "friendName":"pqr@gmail.com",
    "status":"Send Request"

}, {

    "emailId":"abc@gmail.com",
    "friendName":"xyz@gmail.com",
    "status":"Request Pending"


},{

    "emailId":"abc@gmail.com",
    "friendName":"def@gmail.com",
    "status":"Request Pending"


},{

    "emailId":"def@gmail.com",
    "friendName":"abc@gmail.com",
    "status":"Request Pending"


},{

    "emailId":"def@gmail.com",
    "friendName":"xyz@gmail.com",
    "status":"Request Pending"


}]

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const { url, method, headers, body } = request; 
        //capture the request data and store in temp obj 

        return of(null)
        .pipe(mergeMap(handleRoute));
        
        function handleRoute() {
            //handle simulated REST api service endpoints similar to configuring routes
            switch (true) {              
                case url.endsWith('/users/register') && method === 'POST':
                    return register(); //call this function defined below
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate(); //call this function defined below
                case url.endsWith('/findUserByEmailId') && method === 'POST':
                        return getUserByEmailId(); //call this function defined below
                case url.endsWith('/users') && method === 'GET':
                        return getAllUsers(); //call this function defined below
                case url.endsWith('/users/details') && method === 'GET':
                        return getAllUsersDetails(); //call this function defined below
                case url.endsWith('/postByUserId') && method === 'POST':
                        return getPostByUserId(); //call this function defined below
                case url.endsWith('/posts/createpost') && method === 'POST':
                        return createPost(); //call this function defined below
                case url.endsWith('/friends/getFriendsByUserId') && method === 'POST':
                        return getFriendsByUserId(); //call this function defined below
                case url.endsWith('/friends/update') && method === 'PUT':
                        return updateFriendByStatus(); //call this function defined below
                case url.endsWith('/user/byId') && method === 'PUT':
                        return updateUserById(); //call this function defined below
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteUser(); //call this function defined below
                default:
                    // pass through any requests not handled above for any other url route provided
                    return next.handle(request);
            }    
        }

        // route functions called above are defined here
        function register() {
            console.log('inside register '+JSON.stringify(body));
            const user = body; //get the user data from the body of the request
            user.status='unblock';
            user.role='user';
   
            if (users.length>0 && users.find((x:any) => x.email == user.email)) {  //search for user in localstorage on usernmae
                return error('Username "' + user.email + '" is already taken'); //if found return "already exists"
            }

            console.log('outside')
            
            //if not found register the user
  
            user.userId = users.length ? Math.max(...users.map((x:any) => x.userId)) + 1 : 1;
            //if users array has data , iterate over the records using map(), select max id value +1

            users.push(user);   
            let obj={"emailId":user.email,"userPhoto":"","status":"unblock","role":"user"};
            let isPresent=false;
            userByEmailId.forEach((f:any)=>{
                if(f.emailId==user.email) {
                    isPresent=true;
                }
            })
            
            if(!isPresent) {
            userByEmailId.push(obj);
            }
            //insert new user record for user registration.push() inbult JS method)

            localStorage.setItem('users', JSON.stringify(users));  
            //update the new users array in localstorage

            console.log('outside')

            return okList(users);
             //ok() defined below, simulates an all ok http response object with status code 200, from REST API
        }

        function getAllUsersDetails() {
            return okList(users);
        }
        

        function authenticate() { //validate the user
            const { username, password } = body;
            console.log(username+' '+password)
            //get the credential from the body data of the request  object
            //search for the user record based on username and password

            //const user = users.filter((x:any) => x.username === username && x.password === password)[0]

            let flag=false;
            let user=undefined;

            users.forEach((x:any)=>{
                if(x.email===username) {
                    flag=true;
                    user=x;
                }
            })

            console.log('users are '+JSON.stringify(users))
            console.log('user is '+user);
            
            //return error if user is not found in the localstorage, based on credentials provided
            if (!flag) return error('Username or password is incorrect');

            if(user!.status=='block') {
                window.alert('user is blocked');
                return error('user is blocked');
            }

            //ok(), defined below simulates an all ok http response object with status code 200, from REST API
            //if user is found, return a temp json object, along with a JWT token
            return ok({
                token: 'fake-jwt-token' // Dummy JWT Token
            });
        }

        function getUsers() {//retreive users with logged in status 
            if (!isLoggedIn()) return unauthorized(); //if not logged in return unauthorized
                                                      //isLoggedIn() defined below
            localStorage.setItem('users', JSON.stringify(users)); 
            return ok();//else return logged in user
            //ok(), defined below simulates an all ok http response object with status code 200, from REST API
        }

        function getAllUsers() {


            return okList(userByEmailId);

        }

        function createPost() {
            let emailId=body.emailId;
            let post = body.post;

            let obj= {'emailId':emailId,'post':post};

            postByUserId.push(obj);

            return ok('post created successfully');
        }

        function getUserByEmailId() {

            let emailId = body.emailId;

            let user={};

            userByEmailId.forEach((x:any)=>{
                if(x.emailId == emailId) {
                        user=x;
                }
            })
    
            return ok(user);
        
        }

        function getPostByUserId() {
            let emailId=body.emailId;
            let userPost: any[] =[];

            postByUserId.forEach((x:any)=>{
                if(x.emailId == emailId) {
                    userPost.push(x);
                }
            });

        

            return okList(userPost);
        }

        function updateUserById() {

            let emailId = body.emailId;

            if(body.status) {
                let status= body.status;
                users.forEach((z:any)=>{
                    if(z.emailId==emailId) {
                        z.status=status;
                    }
                });

                userByEmailId.forEach((a:any)=>{
                    if(a.emailId==emailId) {
                        a.status="block";
                    }
                });

            } else {
                
                let firstName=body.firstName;
                let lastName=body.lastName;
                let dob= body.dob;
                let password= body.password;

                users.forEach((z:any)=>{
                    if(z.emailId==emailId) {
                        z.firstName=firstName;
                        z.lastName=lastName;
                        z.dob=dob;
                        z.password=password;
                    }
                });
            }
            
            return  ok('Updated successfully');
            
        }

        function getFriendsByUserId() {

          let emailId=body.emailId;

        let friendsList =  friendsByUserId.filter((x:any)=>{
            if(x.emailId == emailId) {
                    return x;
            }

          });

          return okList(friendsList);
            
        }

        function updateFriendByStatus() {
            let emailId = body.emailId;
            let status = body.status;

            friendsByUserId.forEach((y:any)=>{
                if(y.emailId==emailId) {
                    y.status=status;
                }
            })

            return okList(friendsByUserId);

        }

        function deleteUser() {//delete user from localstorage
            if (!isLoggedIn()) return unauthorized();  //if not logged in return unauthorized
                                                       //isLoggedIn() defined below

            users = users.filter((x:any) => x.id !== idFromUrl()); 
            //filter() removes the user record from localstorage users array, for  the userid that is passed to the url
            //idFromUrl() defined below. splits the url on '/' seperator and returns the userid segment passed in the url

            localStorage.setItem('users', JSON.stringify(users)); 
            //save the updated users array back to the localstorage
            
            return ok(); 
            //ok(), defined below simulates an all ok http response object with status code 200, from REST API
        }

        //Custom helper functions................

        function ok(body?: any | undefined) {//simulates an all ok http response object with status code 200, from REST API
                            //? = indicates accpet data in the body paramer or accepts null also
            return of(new HttpResponse({ status: 200, body }))
        }
        function okList(body?: any[]| undefined) {//simulates an all ok http response object with status code 200, from REST API
                        //? = indicates accpet data in the body paramer or accepts null also
        return of(new HttpResponse({ status: 200, body }))
    }
        function error(message: any) {//throws a custom error message passed to this function
            return throwError({ error: { message } });
        }
        function unauthorized() { //throws http 401 error code
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }
        function isLoggedIn() {/*from the request object above, captures header with 'auth' key having value = JWT token
                               also check for the "Bearer" keyword that is set by the JWT interceptor service for 
                               logged in usres only*/
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
        function idFromUrl() {//splits the url infro that is captured from the request object defined above.
            const urlParts = url.split('/');  //split the url on every '/' seperator
            return parseInt(urlParts[urlParts.length - 1]); //0 based index, return url segments as an array in int format
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS, //add this class as a fake REST API endpoint to intercept HTTP requests
    useClass: FakeBackendInterceptor,
    multi: true                 //multiple http requests can be handled by this class
};











