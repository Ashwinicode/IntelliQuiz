package com.exam;

import com.exam.helper.UserFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {
	@Autowired
	private UserService userService;


	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);

	}
//this method will be executed whenever the main will be executed to ensure that project is working fine
	@Override
	public void run(String... args) throws Exception {
		try {
			System.out.println("Starting code...");
			User user = new User();
			user.setFirstname("Ashwini");
			user.setLastname("Vishwakarma");
			user.setUsername("ashwini002");
			user.setPassword(this.bCryptPasswordEncoder.encode("abc"));
			user.setEmail("abc@gmail.com");
			user.setPhone("8434302581");
			user.setProfile("default.png");

			Role role1 = new Role();
			role1.setRoleId(44l);
			role1.setRoleName("ADMIN");

			Set<UserRole> userRoleSet = new HashSet<>();
			UserRole userRole = new UserRole();
			userRole.setRole(role1);
			userRole.setUser(user);
			userRoleSet.add(userRole);

			User user1 = this.userService.createUser(user, userRoleSet);
			System.out.println(user1.getUsername());
		}catch (UserFoundException e){
			e.printStackTrace();
		}
	}
}
