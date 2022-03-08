package com.crudwithangular.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crudwithangular.model.Employee;
import com.crudwithangular.repository.EmployeeRepository;

@Service
public class EmployeeServices {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	public List<Employee> getAllEmployee(){
		return employeeRepository.findAll();
	}
	
}
