import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { Container, Radio, Stack } from 'native-base'




const SchedulePickup = (props) => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let date = new Date();
    let today = new Date();
    let tomorrow = new Date(date.setDate(today.getDate() + 1));
    let dayAfterTomorrow = new Date(date.setDate(tomorrow.getDate() + 1));


    const dateSlots = [`Today - ${today.getDate()} ${monthNames[today.getMonth()]}`,
        `Tomorrow - ${tomorrow.getDate()} ${monthNames[tomorrow.getMonth()]}`,
        `Day After Tomorrow - ${dayAfterTomorrow.getDate()} ${monthNames[dayAfterTomorrow.getMonth()]}`];

    const timeSlots = ["8 AM to 10 AM", "10 AM to 12 PM", "4 PM to 6 PM", "6 PM to 8 PM"];
    let order = props.route.params.order;

    const [dateSlot, setDateSlot] = useState();
    const [timeSlot, setTimeSlot] = useState();
    
    useEffect(() => {

        
        

    }, [])

    function setPickupslot()
    {
        let pickupSlot = { date: dateSlots[dateSlot], time: timeSlots[timeSlot] }
        order = { ...order, pickupSlot };
        console.log(order);
        props.navigation.navigate("Confirm Order", { order:order });
    }
        

    return (
        < ScrollView >
            <View>
                <Text>Choose the date for pickup</Text>
            </View>
            <View>

                <Radio.Group name="exampleGroup" accessibilityLabel="Choose the date" value={dateSlot} onChange={(newValue) => setDateSlot(newValue)}>
                    <Stack direction={{
                        base: "column",
                        md: "row"
                    }} alignItems={{
                        base: "flex-start",
                        md: "center"
                        }} space={4} w="75%" maxW="300px">
                        
                        {dateSlots.map((slot, index) => {

                            return (<Radio value={index} colorScheme="red" size="sm" my={1} >
                                {slot}
                            </Radio>)
                        })}
                    </Stack>
                </Radio.Group>
            </View>
            <View>
                <Text>Choose a time slot for pickup</Text>
            </View>
            <View>

                <Radio.Group name="exampleGroup" accessibilityLabel="pick a time slot" value={timeSlot} onChange={(newValue) => setTimeSlot(newValue)}>
                    <Stack direction={{
                        base: "column",
                        md: "row"
                    }} alignItems={{
                        base: "flex-start",
                        md: "center"
                    }} space={4} w="75%" maxW="300px">

                        {timeSlots.map((slot, index) => {

                            return (<Radio value={index} colorScheme="red" size="sm" my={1} >
                                { slot }
                            </Radio>)
                        })}
                    </Stack>
                </Radio.Group>
            </View>
            <View style={{ width: '80%', alignItems: "center" }}>
                <Button title="Confirm" onPress={() => setPickupslot()} />
            </View>
        </ScrollView>
    )

}

export default SchedulePickup;