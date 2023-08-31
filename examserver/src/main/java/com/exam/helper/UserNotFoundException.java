package com.exam.helper;

public class UserNotFoundException extends Exception{
    public UserNotFoundException() {
        super("User with this username not found in the DB.");
    }
    public UserNotFoundException(String msg){
        super(msg);
    }
}
