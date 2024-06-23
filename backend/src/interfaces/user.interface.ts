export interface User{
    id?: string;
    username: string;
    email: string;
    password: string;
    role: string;
    profilePhoto?: string;
    firstName: string;
    lastName: string;
}

export interface login_details {
  email: string;
  password: string;
}

export interface token_details {
  id: string;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
}

  
  export interface changes {
    user_id: string,
    project_id: string
  }