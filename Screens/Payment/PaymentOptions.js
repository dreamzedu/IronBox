import React, { useState } from 'react'
import { View, Button } from 'react-native'

import {
    Text, Box, HStack, Heading,FlatList, Avatar, AvatarImage,
    Radio, RadioGroup, VStack, RadioIndicator, RadioLabel, RadioIcon, CircleIcon,
    Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem, ChevronDownIcon,
    Icon } from "@gluestack-ui/themed";
import { ScrollView } from 'react-native-gesture-handler';

const methods = [
    { name: 'Cash on Delivery', value: 1 },
    { name: 'Bank Transfer', value: 2 },
    { name: 'Card Payment', value: 3}
]

const paymentCards = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'MasterCard', value: 3},
    { name: 'Other', value: 4}
]

const PaymentOptions = (props) => {

    const order = props.route.params;

    const [selected, setSelected] = useState();
    const [card, setCard] = useState();
    return (
        <ScrollView>
           
               <View>
                   <Heading>Choose your payment method</Heading>
               </View>
          
           <View>
               
                <Box py="$10">
                    <FlatList
                        data={methods}
                        renderItem={({ item }) => (
                            <Box
                                borderBottomWidth="$1"
                                borderColor="$trueGray800"
                                $dark-borderColor="$trueGray100"
                                $base-pl={0}
                                $base-pr={0}
                                $sm-pl="$4"
                                $sm-pr="$5"
                                py="$2"
                            >
                                <HStack space="md" justifyContent="space-between">
                                    
                                        <Text
                                            color="$coolGray800"
                                            fontWeight="$bold"
                                            $dark-color="$warmGray100"
                                        >
                                            {item.name}
                                    </Text>
                                    <RadioGroup>
                                    <Radio style={{ marginVertical: 5 }} selected={selected == item.value}  key={item.name}>
                                        <RadioIndicator mr="$2">
                                            <RadioIcon as={CircleIcon} />
                                        </RadioIndicator>                                        
                                        </Radio>
                                    </RadioGroup>
                                </HStack>
                            </Box>
                        )}
                        keyExtractor={(item) => item.name}
                    />
                </Box>


                {selected == 3 ? (
                    <Select onValueChange={(e) => setCard(e)} selectedValue={card}>
                                <SelectTrigger variant="outline" size="md" >
                                    <SelectInput placeholder="Select Reason" />
                                    <SelectIcon mr="$3">
                                        <Icon as={ChevronDownIcon} />
                                    </SelectIcon>
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectBackdrop />
                                    <SelectContent>
                                        <SelectDragIndicatorWrapper>
                                            <SelectDragIndicator />
                                        </SelectDragIndicatorWrapper>
                                        {paymentCards.map((c) => {
                                            return (
                                                <SelectItem key={c.name} label={c.name} value={c.name} />
                                            );
                                        })}
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                   
               ) : null }
               <View style={{ marginTop: 60, alignSelf: 'center' }}>
                       <Button 
                       title={"Confirm"} 
                       onPress={() => props.navigation.navigate("Confirm", { order })}/>
               </View>
            </View>
        </ScrollView>
    )
}

export default PaymentOptions;