import React, { Component } from 'react';
import './App.css';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend   } from 'recharts';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

const data = [1,2,2,3,4,5,5,6,7,1,"hogehoge","piyo"]
const style = {
  margin: 12,
};


const pokemon = require('pokemon');

console.log(pokemon.getId(pokemon.random()));

const pokeData = pokemon.all('ja');
// npm pokemon request recharts ポケモン　リクエスト　グラフ


class App extends Component {
    constructor(props){
        super(props);
        this.state = {"name": "ポケモンの名前",
            "name_e":"英語名",
            "classification": null,
            "type": "ポケモンのタイプ",
            "image": "",
            "image_b":"",
            "weight": 0,
            "height": 0,
            "id":"図鑑番号",
            "H":0,
            "A":0,
            "B":0,
            "C":0,
            "D":0,
            "S":0,
		"data":null
        };

	this.data = {data:"test"}


        this.getPokemon = this.getPokemon.bind(this);
    }

someeve(eve){
this.data.data = eve;
}

setitem(){
this.getPokemon(this.data.data)
}

    getPokemon(pokename){
        let pokeType = [];
        let num = pokemon.getId(pokename,'ja');
        fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
            .then((response) => response.json())
            .then((json) => { //とってきたjsonのデータをstateに入れる
                this.setState({weight:json.weight});
                this.setState({height:json.height});
                this.setState({id:json.id});
                this.setState({name:pokemon.getName(this.state.id,'ja')});
                this.setState({name_e:pokemon.getName(this.state.id,'en')});
                for (let i =0;i<json["types"].length;i++){
                    pokeType += " : " +json["types"][i].type.name;
                }
		this.setState({type:pokeType});
                this.setState({S:json["stats"][0]["base_stat"]});
                this.setState({A:json["stats"][4]["base_stat"]});
                this.setState({B:json["stats"][3]["base_stat"]});
                this.setState({C:json["stats"][2]["base_stat"]});
                this.setState({D:json["stats"][1]["base_stat"]});
                this.setState({H:json["stats"][5]["base_stat"]});





                fetch(json["forms"][0].url)
                    .then((response2)=> response2.json())
                    .then((json2) => {
                    this.setState({image:json2["sprites"]["front_default"]});
                        this.setState({image_b:json2["sprites"]["back_default"]})
                    })

            } )
            .catch((response) => { //例外処理
                alert("ポケモンの名前を入力してください！");
            })
    };
    render() {
    return (
      <div className="rooting">
            <div className="textArea">
<MuiThemeProvider>
 <AutoComplete
          hintText="Type anything"
          dataSource={pokeData}
          onUpdateInput={(input)=>{this.someeve(input)}}
        />
<RaisedButton label="Primary" primary={true} style={style} onClick={()=>{this.setitem()}} />
<p>{this.state.data}</p>
        </MuiThemeProvider>

        </div>


            <div className="container">

            <div className="text">
          <h1>ポケモンずかん</h1>
          <img src={this.state.image} className="image" alt="SampleImage"/>
            <img src={this.state.image_b} className="image_b" />
                <p>図鑑ナンバー => {this.state.id}</p>
          <p>{this.state.name}</p>
            <p>英語名: {this.state.name_e}</p>
          <p>{this.state.type}</p>
          <p>重さ:{this.state.weight},高さ:{this.state.height}</p>
            </div>

        <div className="text">

        <p>H:{this.state.H} A:{this.state.A} B:{this.state.B}</p>
        <p>C:{this.state.C} D:{this.state.D} S:{this.state.S}</p>

	<RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={
[
    { subject: 'hp', A: this.state.H , B: 110, fullMark: 150 },
    { subject: 'attack', A: this.state.A, B: 130, fullMark: 150 },
    { subject: 'defense', A: this.state.B, B: 130, fullMark: 150 },
    { subject: 'speed', A: this.state.S, B: 100, fullMark: 150 },
    { subject: 'special-defense', A: this.state.D, B: 90, fullMark: 150 },
    { subject: 'special-attack', A: this.state.C, B: 85, fullMark: 150 },]
}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
        </RadarChart>


        </div>

            <div className="text" id="bot">
<p>Thanks for watching</p>
<p className="under">FollowMe!<a href="#">MyTwitter</a></p>
                </div>

            </div>



      </div>
    );
  }
}


export default App;
//<canvas id="myChart"></canvas>
