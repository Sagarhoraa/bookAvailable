import {
        View,
        Text, 
        ScrollView, 
        TouchableOpacity,
        KeyboardAvoidingView, 
        Platform, 
        TextInput,
        Alert
      } from 'react-native';
import {useState} from 'react';
import {useRouter} from "expo-router";
import styles from "../../assets/styles/create.styles"
import {Ionicons} from '@expo/vector-icons';
import COLORS from '../../constants/colors';



export default function Create() {
  const [title, setTitle] = useState("");
  const [caption, setCaption]= useState("");
  const [rating, setRating]= useState("3");
  const [image, setImage]= useState("null");
  const [imageBase64, setImageBase64]= useState("null");
  const [loading, setLoading]= useState("false");

  const router = useRouter();

  const PickImage = async () =>{
    try {
      //request permission to access the camera
      if(Platform.OS !== "web"){
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
          return;
      }
    } catch (error) {
      
    }
  }
  
  const handleSubmit = async () => {}
  
  const renderRatingPicker =  () => {
    const stars =[];
    for (let i=1; i<=5; i++){
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
          <Ionicons
          name={i<= rating ? "star" : "star-outline"}
          size={32}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }
     return <View style={styles.ratingContainer}>{stars}</View>;

  };
 
  
  
  return (
    <KeyboardAvoidingView 
      style={{ flex:1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>

      <View style={styles.card}>
       {/*HEADER*/}
       <View style={styles.header}>
          <Text style={styles.title}>Add Book Recommendation</Text>
          <Text style={styles.subtitle}>Share Your Favourite reads with others</Text>
       </View>

       <View style={styles.form}>

        {/*BOOK titles*/}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Book Title</Text>
          <View style={styles.inputContainer}>
            <Ionicons
            name="book-outline"
            size={20}
            color={COLORS.textSecondary}
            style={styles.inputIcon}
            />
            <TextInput
            style={styles.input}
            placeholder='Enter book title'
            placeholderTextColor={COLORS.placeholderText}
            value={title}
            onChangeText={setTitle}
            />
          </View>
        </View>

        {/*RATINGS*/}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Your Rating</Text>
          {renderRatingPicker()}
        </View>


        {/*image*/}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Book Image</Text>
          <TouchableOpacity style={styles.imagePicker}>
           {image ? (
            <Image source={{ uri: image}} style={styles.previewImage} />
           ): (
            <View style={styles.placeholderContainer}>
              <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
              <Text style={styles.placeholderText}>Tap to select image</Text>
            </View>
           )}

          </TouchableOpacity>
        </View>
       </View>

      </View>
      </ScrollView>
      <Text>create tab</Text>
    </KeyboardAvoidingView>
  )
}