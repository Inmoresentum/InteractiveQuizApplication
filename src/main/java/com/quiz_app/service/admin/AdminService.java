package com.quiz_app.service.admin;

import com.quiz_app.entity.user.UserDto;
import com.quiz_app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public Page<UserDto> getUsers(int page) {
        int pageSize = 350;
        Pageable pageable = PageRequest.of(page, pageSize);
        var listOfUsers = userRepository.findAll(pageable)
                .map((user) -> modelMapper.map(user, UserDto.class));
        System.out.println(listOfUsers);
        return listOfUsers;
    }
}
