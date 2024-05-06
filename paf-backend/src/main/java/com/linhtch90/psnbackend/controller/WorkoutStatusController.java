package com.linhtch90.psnbackend.controller;

import com.linhtch90.psnbackend.entity.DoubleIdObjectEntity;
import com.linhtch90.psnbackend.entity.IdObjectEntity;
import com.linhtch90.psnbackend.entity.WorkoutStatusEntity;
import com.linhtch90.psnbackend.service.WorkoutStatusService;
import com.linhtch90.psnbackend.service.ResponseObjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/api/v1")
public class WorkoutStatusController {
    @Autowired
    private WorkoutStatusService workoutStatusService;

    @PostMapping("/insertWorkoutStatus")
    public ResponseEntity<ResponseObjectService> insertWorkoutStatus(@RequestBody WorkoutStatusEntity inputWorkoutStatus) {
        return new ResponseEntity<ResponseObjectService>(workoutStatusService.insertWorkoutStatus(inputWorkoutStatus), HttpStatus.OK);
    }

    @PostMapping("/followingWorkoutStatus")
    public ResponseEntity<ResponseObjectService> findWorkoutStatusByFollowing(@RequestBody IdObjectEntity inputUserId) {
        return new ResponseEntity<ResponseObjectService>(workoutStatusService.findWorkoutStatusByFollowing(inputUserId), HttpStatus.OK);
    }
}