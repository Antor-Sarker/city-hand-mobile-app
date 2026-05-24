import AppBar from "@/components/home/appBar";
import { useNavigation } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AppBar />

      <Text>Home Screen rrrrrrrrrrrrrrrrrrrrrr</Text>
      <Pressable onPress={() => navigation.navigate("details")}>
        <Text>Go to Details</Text>
      </Pressable>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo labore
        totam architecto aperiam beatae nobis magnam ex nemo ad? Harum ad
        exercitationem illo et dolorum rerum hic iste temporibus nostrum
        deserunt molestias dolor sint ipsam id expedita ullam laudantium animi
        repudiandae, veniam numquam labore accusamus saepe in? Cumque minima
        quis dolore quisquam dolorum laborum magni blanditiis, beatae dolorem
        soluta nulla repellat voluptate, debitis placeat excepturi. Rerum
        voluptates, quisquam vel maxime laborum omnis consectetur mollitia et
        corrupti. Excepturi, harum repudiandae, aut eligendi iure cum facilis
        fugiat magni libero laudantium recusandae, vero esse quidem voluptatem
        maiores ea ut soluta aspernatur perspiciatis laborum! Voluptate quasi
        quas reiciendis impedit temporibus, magnam assumenda eum! Maiores fugiat
        cumque vero nihil corporis, molestias molestiae. Odio laboriosam labore
        voluptates similique accusantium? Eos, in quibusdam nemo nostrum nulla
        perspiciatis voluptatibus fugit rerum eum rem voluptate, modi ea
        incidunt harum optio ducimus enim earum quam accusantium est libero?
        Ullam deleniti tenetur nemo recusandae, culpa ex earum quibusdam fuga
        illum veniam aspernatur officia dicta id nulla, necessitatibus ducimus
        aliquam eaque rerum consequuntur est sequi voluptatem natus? Incidunt
        maxime molestiae tempora velit accusamus rerum placeat libero minus
        quibusdam sed eos fuga voluptatibus mollitia harum magni quis iure, a
        provident. Doloribus cupiditate quae praesentium itaque consectetur
        suscipit? Enim unde impedit voluptatum temporibus. Consequatur facere
        recusandae ab molestiae rem, tempora repudiandae quos corporis enim!
        Sapiente aspernatur quos, dolor ex minima necessitatibus? Mollitia
        fugiat dicta quis laboriosam sequi molestias dolore ratione perferendis
        rem debitis asperiores dolorum optio minima consequuntur adipisci
        consequatur fuga ipsum nisi quam earum illum cum reprehenderit, tenetur
        architecto. Maxime nisi exercitationem repudiandae animi, asperiores
        tempore fuga non enim modi ducimus eum accusamus, libero excepturi
        laudantium commodi minus numquam! Aspernatur tempora accusamus beatae
        ratione dolor ipsum excepturi dolore. Adipisci reiciendis magni veniam
        labore non itaque consequatur assumenda a? Saepe similique nostrum
        adipisci voluptates.
      </Text>
    </ScrollView>

    // {/* </SafeAreaView> */}
  );
}
