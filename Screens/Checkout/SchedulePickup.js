import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, TextInput } from 'react-native';
import { Container, Radio, Stack } from 'native-base'
import Error from "../../Shared/Error";



const SchedulePickup = (props) => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

    let order = props.route.params.order;
    
    useEffect(() => {

        var currentHours = date.getHours();
        if (currentHours >= timeSlots[timeSlots.length - 1].startTime) {
            let slots = [...dateSlots]; // making a copy of array as the state should be treated as immutable if we use the same array then the change detection does not work because it compares the reference
            slots[0].isAvailable = false
            setDateSlots(slots);
        }        

    }, [])

    function setPickupslot()
    {
        if (selectedDateSlotIndex == null) { setError("Select a pickup date.") }
        else if (selectedTimeSlotIndex == null) { setError("Select a pickup time slot.") }
        else {
            let pickupSlot = { date: dateSlots[selectedDateSlotIndex].date.toString(), startTime: timeSlots[selectedTimeSlotIndex].startTime, endTime: timeSlots[selectedTimeSlotIndex].endTime }
            order = { ...order, pickupSlot };
            console.log(order);
            props.navigation.navigate("Confirm Order", { order: order });
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
                <Text>Choose the date for pickup</Text>
            </View>
            <View>

                <Radio.Group name="exampleGroup" accessibilityLabel="Choose the date" value={selectedDateSlotIndex} onChange={(selectedIndex) => onDateSlotChanged(selectedIndex)}>
                    <Stack direction={{
                        base: "column",
                        md: "row"
                    }} alignItems={{
                        base: "flex-start",
                        md: "center"
                        }} space={4} w="75%" maxW="300px">
                        
                        {dateSlots.map((slot, index) => {
                            if(slot.isAvailable)
                                return (<Radio value={index} key={"d_"+index} colorScheme="red" size="sm" my={1} >
                                {slot.description}
                                </Radio>)
                            else
                                return (<Radio value={index} key={"d_" + index} colorScheme="red" size="sm" my={1} isDisabled>
                                    {slot.description + " (Not Available)"}
                                </Radio>)
                        })}
                    </Stack>
                </Radio.Group>
            </View>
            <View>
                <Text>Choose a time slot for pickup</Text>
            </View>
            <View>

                <Radio.Group name="exampleGroup" accessibilityLabel="pick a time slot" value={selectedTimeSlotIndex} onChange={(selectedIndex) => onTimeSlotChanged(selectedIndex)}>
                    <Stack direction={{
                        base: "column",
                        md: "row"
                    }} alignItems={{
                        base: "flex-start",
                        md: "center"
                    }} space={4} w="75%" maxW="300px">

                        {timeSlots.map((slot, index) => {
                                                      
                            if (slot.isAvailable)
                                return (<Radio value={index} key={"t_" + index} colorScheme="red" size="sm" my={1} >
                                    {slot.description}
                                </Radio>)
                            else
                                return (<Radio value={index} key={"t_" + index} colorScheme="red" size="sm" my={1} isDisabled>
                                    {slot.description + " (Not Available)"}
                                </Radio>)
                        })}
                    </Stack>
                </Radio.Group>
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