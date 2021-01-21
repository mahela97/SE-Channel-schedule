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
  `program_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `program_id` varchar(20) NOT NULL,
  `channel_id` varchar(20) DEFAULT NULL,
  `program_name` varchar(20) DEFAULT NULL,
  `timeslot_id` varchar(20) DEFAULT NULL
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
  `program_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `timeslot`
--

CREATE TABLE `timeslot` (
  `timeslot_id` varchar(20) NOT NULL,
  `day` varchar(20) DEFAULT NULL,
  `start_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
