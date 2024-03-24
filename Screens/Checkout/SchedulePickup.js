import React, { useEffect, useState, useContext } from 'react';
import { View, ScrollView, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Text, Radio, RadioGroup, VStack, RadioIndicator, RadioLabel, RadioIcon, CircleIcon, Spinner, Button, ButtonText } from '@gluestack-ui/themed'
import Error from "../../Shared/Error";
import AuthGlobal from "../../Context/store/AuthGlobal";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/orderActions";
import * as commonstyles from "../../common-styles";

const { width, height } = Dimensions.get("window")

const SchedulePickup = (props) => {

    const context = useContext(AuthGlobal);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //let order = props.route.params.order;
    let order = props.order;
   
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
    const [processing, setProcessing] = useState(false);
    //const [testTime, setTestTime] = useState("1");

    
    
    useEffect(() => {
        try {
            console.log("Schedule Pickup reloaded...")
            var currentHours = date.getHours();
            if (currentHours >= timeSlots[timeSlots.length - 1].startTime - 2) {
                let slots = [...dateSlots]; // making a copy of array as the state should be treated as immutable if we use the same array then the change detection does not work because it compares the reference
                slots[0].isAvailable = false
                setDateSlots(slots);
            }

         
            // Set date time in case editing or reviewing the screen
            let pickupSlot = order?.pickupSlot;
            if (props.flow === 'update') {
                pickupSlot = props.pickupSlot;
            }

            setDefaultPickupSlot();            

            if (pickupSlot !== null) {
                var dt = new Date(pickupSlot?.date);
                for (var i = 0; i < dateSlots.length; i++) {
                    if (dt?.getDate() === dateSlots[i]?.date?.getDate() && dateSlots[i].isAvailable) {
                        //setSelectedDateSlotIndex(i);
                        onDateSlotChanged(i)
                        break;
                    }
                }

                for (var i = 0; i < timeSlots.length; i++) {
                    if (pickupSlot?.startTime === timeSlots[i].startTime && pickupSlot?.endTime === timeSlots[i].endTime && timeSlots[i].isAvailable) {
                        setSelectedTimeSlotIndex(i);
                        break;
                    }
                }
            }
                        
        }
        catch (e) {
            console.log(e)
        }
    }, [props.order?.pickupSlot])

   
    setDefaultPickupSlot = () => {
        for (var i = 0; i < dateSlots.length; i++) {
            if (dateSlots[i].isAvailable) {
                setSelectedDateSlotIndex(i);
                onDateSlotChanged(i)
                break;
            }
        }

        for (var i = 0; i < timeSlots.length; i++) {
            if (timeSlots[i].isAvailable) {
                setSelectedTimeSlotIndex(i);
                onTimeSlotChanged(i);
                break;
            }
        }
    }

    function setPickupslot()
    {
        if (selectedDateSlotIndex === -1) { setError("Select a pickup date.") }
        else if (selectedTimeSlotIndex === -1) { setError("Select a pickup time slot.") }
        else {
            let pickupSlot = { date: dateSlots[selectedDateSlotIndex].date.toString(), startTime: timeSlots[selectedTimeSlotIndex].startTime, endTime: timeSlots[selectedTimeSlotIndex].endTime }
            order = { ...order, pickupSlot: pickupSlot};
                        
            if (context.stateUser.user.isAdmin && props.flow === "update") {
                props.updatePickupSchedule(pickupSlot) // updatePickupSchedule is coming from AdminUpdatePickupSchedule
                
                
            }
            else {
                props.updateOrder(order);
                //props.navigation.navigate("Add Items", { order: order });
                props.navigation.navigate("Add Items");
            }
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

        if (selectedIndex !== -1) {
            let selectedDate = dateSlots[selectedIndex];
            if (selectedDate.date.getDate() === today.getDate()) {
                var currentHours = date.getHours(); //testTime;
                for (var i = timeSlots.length - 1; i >= 0; i--) {
                    if (currentHours >= timeSlots[i].startTime - 2) {
                        for (var j = 0; j <= i; j++) {
                            timeSlots[j].isAvailable = false;
                        }
                        break;
                    }
                }
            }
            setTimeSlots(timeSlots);
        }
    }

    function resetTimeSlots() {
        for (var j = 0; j < timeSlots.length; j++) {
            timeSlots[j].isAvailable = true;
        }
        onTimeSlotChanged(-1);
    }
        

    return (
        
            <View style={commonstyles.container}>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={commonstyles.subContainer}>
                    <View >
                        <Text style={styles.title}>Choose pickup date</Text>            
                        <View style={{ paddingLeft: 10, paddingBottom: 10 }}>

                        <RadioGroup value={selectedDateSlotIndex} onChange={(selectedIndex) => onDateSlotChanged(selectedIndex)}>
                            <VStack space="md">
                                    {dateSlots.map((slot, index) => {
                                        return (<Radio style={{marginVertical:5}} value={index} isDisabled={!slot.isAvailable} key={'date' + index}>
                                    <RadioIndicator mr="$2">
                                        <RadioIcon as={CircleIcon} />
                                    </RadioIndicator>
                                        <RadioLabel>{slot.description + (!slot.isAvailable ? " (Not Available)": "")}</RadioLabel>
                                    </Radio>)                           
                                })}
                            </VStack>
                        </RadioGroup>
                    </View>
                    </View>
                    <View style={{ paddingTop: 20, paddingBottom:20 }}>
                        <Text style={styles.title}>Choose pickup time-slot</Text>            
                        <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
                        <RadioGroup value={selectedTimeSlotIndex} onChange={(selectedIndex) => onTimeSlotChanged(selectedIndex)}>
                            <VStack space="md">
                                {timeSlots.map((slot, index) => {
                                    return (<Radio style={{ marginVertical: 5 }} value={index} isDisabled={!slot.isAvailable} key={'time' + index}>
                                        <RadioIndicator mr="$2">
                                            <RadioIcon as={CircleIcon} />
                                        </RadioIndicator>
                                        <RadioLabel>{slot.description + (!slot.isAvailable ? " (Not Available)" : "")}</RadioLabel>
                                    </Radio>)
                                })}
                            </VStack>
                        </RadioGroup>
                
                                    </View>
                    </View>
                    {/*<View><Text>Note: you can re-schedule the pick until one hour before the scheduled pickup. Any re-schedule or cancellation after that is chargable.</Text></View>*/}
                    {/*<TextInput value={testTime} onChangeText={(value) => setTestTime(value)} />*/}
            
                    <View>{error ? <Error message={error} /> : null}</View>
                    {processing ? <Spinner size='large'></Spinner> : null}
                </View>
            </ScrollView>
            <View style={commonstyles.footer}>
                <Button variant='link' onPress={() => setPickupslot()} >
                    <ButtonText color='$white' fontWeight="$medium" fontSize="$md">Confirm
                        </ButtonText>
                </Button>
            </View>
        </View>
    )

}

const mapStateToProps = (state) => {
    const { order } = state.order;
    return {
        order: state.order,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateOrder: (order) => dispatch(actions.updateOrder(order)),
    }
}

const styles = StyleSheet.create({
    
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
    }
}
)

//export default SchedulePickup;
export default connect(mapStateToProps, mapDispatchToProps)(SchedulePickup);

