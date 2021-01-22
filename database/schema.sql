---------------------------------------------------------
-- Table structure for admin


CREATE TABLE `admin` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
);
----------------------------------------------------------

CREATE TABLE `channel` (
  `channel_id` varchar(20) NOT NULL,
  `channel_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `user_id` int(10) DEFAULT NULL,
  `feedback_id` varchar(20) NOT NULL,
  `feedback` varchar(10000) DEFAULT NULL,
  `program_id` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `program_id` int(20) NOT NULL,
  `channel_id` varchar(20) DEFAULT NULL,
  `program_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `user_id` int(10) NOT NULL,
  `channeld_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `stared_program`
--

CREATE TABLE `stared_program` (
  `user_id` int(10) NOT NULL,
  `program_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `timeslot`
--


CREATE TABLE `timeslot` (
  `timeslot_id` int(20) NOT NULL,
  `start_time` time NOT NULL DEFAULT current_timestamp(),
  `end_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timeslot`
--

INSERT INTO `timeslot` (`timeslot_id`, `start_time`, `end_time`) VALUES
(2, '00:00:00', '05:30:00'),
(3, '05:30:00', '06:30:00'),
(4, '06:30:00', '06:45:00'),
(5, '06:45:00', '08:00:00'),
(6, '08:00:00', '11:00:00'),
(7, '11:00:00', '12:00:00'),
(8, '12:00:00', '12:30:00'),
(9, '12:30:00', '15:30:00'),
(10, '15:30:00', '18:00:00'),
(11, '18:00:00', '19:00:00'),
(12, '19:00:00', '19:30:00'),
(13, '19:30:00', '20:00:00'),
(14, '20:00:00', '20:30:00'),
(15, '20:30:00', '21:00:00'),
(16, '21:00:00', '21:30:00'),
(17, '21:30:00', '22:00:00'),
(18, '22:00:00', '22:30:00'),
(19, '22:30:00', '00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `timeslot`
--
ALTER TABLE `timeslot`
  ADD PRIMARY KEY (`timeslot_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `timeslot`
--
ALTER TABLE `timeslot`
  MODIFY `timeslot_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `day` (
  `day_id` int(20) NOT NULL,
  `day` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `day`
--
ALTER TABLE `day`
  ADD PRIMARY KEY (`day_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `day`
--
ALTER TABLE `day`
  MODIFY `day_id` int(20) NOT NULL AUTO_INCREMENT;


  INSERT INTO `day` (`day_id`,`day`) VALUES (1,'monday');
INSERT INTO `day` (`day_id`,`day`) VALUES (2,'Tuesday');
INSERT INTO `day` (`day_id`,`day`) VALUES (3,'Wednesday');
INSERT INTO `day` (`day_id`,`day`) VALUES (4,'Thursday');
INSERT INTO `day` (`day_id`,`day`) VALUES (5,'Friday');
INSERT INTO `day` (`day_id`,`day`) VALUES (6,'Saturday');
INSERT INTO `day` (`day_id`,`day`) VALUES (7,'Sunday ');


CREATE TABLE `programtime` (
  `program_id` int(20) NOT NULL,
  `day_id` int(20) NOT NULL,
  `timeslot_id` int(20) DEFAULT NULL,
  `programtime_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `programtime`
--
ALTER TABLE `programtime`
  ADD KEY `program_id` (`program_id`),
  ADD KEY `day_id` (`day_id`),
  ADD KEY `timeslot_id` (`timeslot_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `programtime`
--
ALTER TABLE `programtime`
  ADD CONSTRAINT `programtime_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`),
  ADD CONSTRAINT `programtime_ibfk_2` FOREIGN KEY (`day_id`) REFERENCES `day` (`day_id`),
  ADD CONSTRAINT `programtime_ibfk_3` FOREIGN KEY (`timeslot_id`) REFERENCES `timeslot` (`timeslot_id`);
--
-- Indexes for dumped tables
--

--Indexes for admin table

ALTER TABLE `admin`
  ADD PRIMARY KEY(`email`);


--
-- Indexes for table `channel`
--
ALTER TABLE `channel`
  ADD PRIMARY KEY (`channel_id`);
  

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `program_id` (`program_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`program_id`),
  ADD KEY `channel_id` (`channel_id`),
  ADD KEY `timeslot_id` (`timeslot_id`);

--
-- Indexes for table `staff`
--


--
-- Indexes for table `stared_program`
--
ALTER TABLE `stared_program`
  ADD PRIMARY KEY (`user_id`,`program_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `timeslot`
--
ALTER TABLE `timeslot`
  ADD PRIMARY KEY (`timeslot_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);
ALTER TABLE `user` CHANGE `user_id` `user_id` INT(10)AUTO_INCREMENT;

ALTER TABLE `user`
ADD COLUMN `color` VARCHAR(255) AFTER `type`;

ALTER TABLE `user`
ADD COLUMN `pet` VARCHAR(255) AFTER `type`;

ALTER TABLE user ADD UNIQUE (email);


--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`),
  ADD CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `programs`
--
ALTER TABLE `programs`
  ADD CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`channel_id`),
  ADD CONSTRAINT `programs_ibfk_2` FOREIGN KEY (`timeslot_id`) REFERENCES `timeslot` (`timeslot_id`);

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`channeld_id`) REFERENCES `channel` (`channel_id`);
  


--
-- Constraints for table `stared_program`
--
ALTER TABLE `stared_program`
  ADD CONSTRAINT `stared_program_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`program_id`),
  ADD CONSTRAINT `stared_program_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;
