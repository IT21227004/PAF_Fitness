package com.linhtch90.psnbackend.controller;

import com.linhtch90.psnbackend.entity.DoubleIdObjectEntity;
import com.linhtch90.psnbackend.entity.IdObjectEntity;
import com.linhtch90.psnbackend.entity.WorkoutPlanEntity;
import com.linhtch90.psnbackend.service.WorkoutPlanService;
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
public class WorkoutPlanController {
    @Autowired
    private WorkoutPlanService workoutPlanService;

    @PostMapping("/insertWorkoutPlan")
    public ResponseEntity<ResponseObjectService> insertWorkoutPlan(@RequestBody WorkoutPlanEntity inputWorkoutPlan) {
        return new ResponseEntity<ResponseObjectService>(workoutPlanService.insertWorkoutPlan(inputWorkoutPlan), HttpStatus.OK);
    }

    @PostMapping("/followingWorkoutPlan")
    public ResponseEntity<ResponseObjectService> findWorkoutPlanByFollowing(@RequestBody IdObjectEntity inputUserId) {
        return new ResponseEntity<ResponseObjectService>(workoutPlanService.findWorkoutPlanByFollowing(inputUserId), HttpStatus.OK);
    }
}
