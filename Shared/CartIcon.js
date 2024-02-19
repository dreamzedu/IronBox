import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text, BadgeText } from "@gluestack-ui/themed";

import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        
      <Badge
      h={25}
      w={25}
      bg="$red600"
      borderRadius="$full"
      mb={-1}
      mr={-1}
      zIndex={1}
      variant="solid"
                  style={styles.badge}
    >
                  <BadgeText color="$white" style={styles.text}>{props.cartItems.reduce((n, {count}) => n+ count,0)}</BadgeText>
              </Badge>

              
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
        width: 30,
      height:30,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -20,
    right: -20,
  },
  text: {
    fontSize: 12,
    
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps)(CartIcon);
