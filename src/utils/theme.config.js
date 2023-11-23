const COLORS = {
  primaryColor: "#ff7600",
  secondaryColor: "#000",
  white: "#fff",
  veryLightGray: "hsl(0, 0%, 98%)",
  background: "#f6f6f6",
};

   <LinearGradient
     style={{
       alignItems: "center",
       justifyContent: "center",
       paddingVertical: 12,
       paddingHorizontal: 32,
       borderRadius: 24,
       elevation: 3,
       backgroundColor: "black",
     }}
     onPress={onPress}
   >
     <Text
       style={{
         fontSize: 16,
         lineHeight: 21,
         fontWeight: "bold",
         letterSpacing: 0.25,
         color: "white",
       }}
     >
       Log In
     </Text>
   </LinearGradient>;