import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, TextInput } from 'react-native';
import { Radio, RadioGroup, VStack, RadioIndicator, RadioLabel, RadioIcon, CircleIcon, Heading } from '@gluestack-ui/themed'
import Error from "../../Shared/Error";



const SchedulePickup = (props) => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let order = props.route.params.order;

    let date = new Date();
    let today = new Date();
    let tomorrow = new Date(date.setDate(today.getDate() + 1));
    let dayAfterTomorrow = new Date(date.setDate(tomorrow.getDate() + 1));


    const [dateSlots, setDateSlots] = useState([{ date: today, description: `Today - ${today.getDate()} ${monthNames[today.getMonth()]}`, isAvailable: true },
        { date: tomorrow, description: `Tomorrow - ${tomorrow.getDate()} ${monthNames[tomorrow.getMonth()]}`, isAvailable: true },
        { date: dayAfterTomorrow, description: `Day After Tomorrow - ${dayAfterTomorrow.getDate()} ${monthNames[dayAfterTomorrow.getMonth()]}`, isAvailable: true }]);

    const [timeSlots, setTimeSlots] = useState([{startTime: 8, endTime: 10, description: "8 AM to 10 AM", isAvailable: true },
                        { startTime: 10, endTime: 12, description: "10 AM to 12 PM", isAvailable: true },
                        { startTime: 16, endTime: 18, description: "4 PM to 6 PM", isAvailable: true },
                        { startTime: 18, endTime: 20, description: "6 PM to 8 PM", isAvailable: true }]);
    

    const [selectedDateSlotIndex, setSelectedDateSlotIndex] = useState(-1);
    const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState(-1);

    const [error, setError] = useState("");
    //const [testTime, setTestTime] = useState("1");

    
    
    useEffect(() => {

        var currentHours = date.getHours();
        if (currentHours >= timeSlots[timeSlots.length - 1].startTime) {
            let slots = [...dateSlots]; // making a copy of array as the state should be treated as immutable if we use the same array then the change detection does not work because it compares the reference
            slots[0].isAvailable = false
            setDateSlots(slots);
        }

        // Set date time in case editing or reviewing the screen
        if (order.pickupSlot !== null) {
            var dt = Date(order.pickupSlot?.date);
            for (var i = 0; i < dateSlots.length; i++) {
                if (dt?.getDate() === dateSlots[i]?.date?.getDate()) {
                    setSelectedDateSlotIndex(i);
                    break;
                }
            }

            for (var i = 0; i < timeSlots.length; i++) {
                if (order?.pickupSlot?.startTime === timeSlots[i].startTime && order?.pickupSlot?.endTime === timeSlots[i].endTime) {
                    setSelectedTimeSlotIndex(i);
                    break;
                }
            }
        }

    }, [])

    function setPickupslot()
    {
        if (selectedDateSlotIndex === -1) { setError("Select a pickup date.") }
        else if (selectedTimeSlotIndex === -1) { setError("Select a pickup time slot.") }
        else {
            let pickupSlot = { date: dateSlots[selectedDateSlotIndex].date.toString(), startTime: timeSlots[selectedTimeSlotIndex].startTime, endTime: timeSlots[selectedTimeSlotIndex].endTime }
            order = { ...order, pickupSlot: pickupSlot};
            console.log(order);
            props.navigation.navigate("Add Items", { order: order });
        }
    }

    function onTimeSlotChanged(selectedIndex) {
        setSelectedTimeSlotIndex(selectedIndex);
        setError("");
    }

    function onDateSlotChanged(selectedIndex) {
        setSelectedDateSlotIndex(selectedIndex);
        setError("");
        resetTimeSlots();

        let selectedDate = dateSlots[selectedIndex];
        if (selectedDate.date.getDate() === today.getDate()) {
            var currentHours = date.getHours(); //testTime;
            for (var i = timeSlots.length-1; i >=0 ; i--) {
                if (currentHours >= timeSlots[i].startTime) {
                    for (var j = 0; j <= i; j++) {
                        timeSlots[j].isAvailable = false;
                    }
                    break;
                }
            }
        }
        setTimeSlots(timeSlots);
    }

    function resetTimeSlots() {
        for (var j = 0; j < timeSlots.length; j++) {
            timeSlots[j].isAvailable = true;
        }
    }
        

    return (
        < ScrollView >
            <View>
                <Heading size="sm">Choose the date for pickup</Heading>
            </View>
            <View>

                <RadioGroup value={selectedDateSlotIndex} onChange={(selectedIndex) => onDateSlotChanged(selectedIndex)}>
                    <VStack space="sm">
                        {dateSlots.map((slot, index) => {
                            return(<Radio value={index} isDisabled={!slot.isAvailable }>
                            <RadioIndicator mr="$2">
                                <RadioIcon as={CircleIcon} />
                            </RadioIndicator>
                                <RadioLabel>{slot.description + (!slot.isAvailable ? " (Not Available)": "")}</RadioLabel>
                            </Radio>)                           
                        })}
                    </VStack>
                </RadioGroup>
            </View>
            <Heading size="sm">
                <Text>Choose a time slot for pickup</Text>
            </Heading>
            <View>
                <RadioGroup value={selectedTimeSlotIndex} onChange={(selectedIndex) => onTimeSlotChanged(selectedIndex)}>
                    <VStack space="sm">
                        {timeSlots.map((slot, index) => {
                            return (<Radio value={index} isDisabled={!slot.isAvailable}>
                                <RadioIndicator mr="$2">
                                    <RadioIcon as={CircleIcon} />
                                </RadioIndicator>
                                <RadioLabel>{slot.description + (!slot.isAvailable ? " (Not Available)" : "")}</RadioLabel>
                            </Radio>)
                        })}
                    </VStack>
                </RadioGroup>
                
            </View>
            <View>{error ? <Error message={error} /> : null}</View>
            {/*<TextInput value={testTime} onChangeText={(value) => setTestTime(value)} />*/}
            <View style={{ width: '80%', alignItems: "center" }}>
                <Button title="Confirm" onPress={() => setPickupslot()} />
            </View>
        </ScrollView>
    )

}

export default SchedulePickup;