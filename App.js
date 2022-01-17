import axios from "axios";
import React from "react";
import { View, Text,FlatList , StyleSheet, Dimensions, Image, Linking,Button} from 'react-native';

const baseURL = "https://newsapi.org/v2/everything?q=tesla&from=2021-12-17&sortBy=publishedAt&apiKey=08d2ab0dedcd4bd4905ce60c106ae310";
const { width, height } = Dimensions.get('window')

export default function App() {
  const [post, setPost] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;


  const NewsCard = ({item }) => {
    console.log(item)
    return (
        <View style={styles.cardView}>
            <Text style={styles.title}> {item.source.name}</Text>
            <Text style={styles.author}>{item.url} </Text>
            {/* <Image style={styles.image} source = {{uri: item.urlToImage}}/> */}
            <Image style={styles.image} source={item.urlToImage ? {uri: item.urlToImage } : null}/>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    )
}

  return (
    <View style ={{backgroundColor:'red',flex: 1,justifyContent:'center', }}>
      <FlatList data={post.articles}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({item}) => {
                    return <NewsCard item = {item}/>
                }}
            />

      
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
      backgroundColor: 'white',
      margin: width * 0.03,
      borderRadius: width * 0.05,
      shadowColor: '#000',
      shadowOffset: { width:0.5, height: 0.5 },
      shadowOpacity: 0.5,
      shadowRadius: 3
  },
  title: {
      marginHorizontal: width * 0.05,
      marginVertical: width * 0.03,
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold'

  },
  description: {
      marginVertical: width * 0.05,
      marginHorizontal: width * 0.02,
      color: 'gray',
      fontSize: 18
  },
  image: {
      height: height / 6,
      marginLeft: width * 0.05,
      marginRight: width * 0.05,
      marginVertical: height * 0.02
  },
  author: {
      marginBottom: width * 0.0,
      marginHorizontal: width * 0.05,
      fontSize: 15,
      color: 'gray'

  }

})
