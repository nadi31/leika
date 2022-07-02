import React from "react";
//this is important
import axios from "axios";

import MenuBrowser from "./MenuBrowser";
import MenuMobile from "./MenuMobile";
import Footer from "./Footer";
import { BrowserView, MobileView } from "react-device-detect";

import {
  Form,
  Modal,
  Space,
  DatePicker,
  TimePicker,
  Button,
  Switch,
  Input,
  Upload,
  InputNumber,
  Cascader,
  Spin,
  Radio,
  AutoComplete,
  message,
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  UploadOutlined,
  ScheduleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import * as moment from "moment";

import Password from "antd/lib/input/Password";

const { RangePicker } = DatePicker;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const options = [
  { value: "isBeginner", label: "Débutant" },

  { value: "isIntermediate", label: "Intermédiaire" },
  { value: "isAvanced", label: "Confirmé" },
];
const age = [
  { value: "Tous les âges", label: "Tous les âges" },
  { value: "Adultes", label: "Adultes" },
  { value: "Ados", label: "Ados" },
  { value: "Enfants", label: "Enfants" },
];
const category = [
  { value: "arts_plastiques", label: "Arts plastiques" },
  { value: "arts_de_scene", label: "Arts de scène" },
  { value: "loisirs_creatifs", label: "Loisirs créatifs" },
  { value: "professionnel", label: "Professionnel" },
  { value: "culinaire", label: "Culinaire" },
  { value: "culture", label: "Culture" },
  { value: "linguistique", label: "Linguistique" },
  { value: "sport", label: "Sport" },
  { value: "jeux", label: "Jeux" },
  { value: "beaute_bien_etre", label: "Beauté & bien-être" },
  { value: "tours_circuits", label: "Tours et circuits" },
];

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const { TextArea } = Input;

const props = {};
const config = {
  rules: [
    {
      type: "object",
      // required: true,
      message: "Please select time!",
    },
  ],
};

const rangeConfig = {
  rules: [
    {
      type: "array",
      // required: true,
      message: "Veuillez selectionner la date et l'heure!",
    },
  ],
};

//const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

class CourseForm extends React.Component {
  componentWillUnmount() {
    window.removeEventListener("resize", () => {});
  }
  componentDidMount() {
    this.setState({ ID_user: localStorage.getItem("ID_user") });

    window.addEventListener("resize", () => {
      this.setState({ width: window.innerWidth });
      console.log(window.innerWidth);
    });

    if (!this.state.isAuthenficated == true && this.state.user_type == 3) {
      console.log("***PAS CONNECTEE");
      return Modal.error({
        title: "Pas connecté(e)",
        content: "Veillez vous connecter pour ajouter des cours",
      });
    }
  }

  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSub = this.handleSub.bind(this);
    this.state = {
      seats: 0,
      disabled: true,
      is_remote: true,
      isRemote: false,
      is_beginner: false,
      is_avanced: false,
      is_intermediate: false,
      loading: false,
      visible: false,
      visibl: false,
      input: "",
      list2: [],
      disabled_upload: false,
      fileList: [],
      value: 0,
      date: [],
      date_selected: "",
      discount: 0,
      c_id: null,
      element: null,
      ID_user: null,
      user_type: null,
      liste_finale: [],
      category: null,
      list_seats: [],
      selectedValue: 0,
      width: window.innerWidth,
      //creation_front: true,

      isAuthenficated: localStorage.getItem("isAuthenficated"),
    };
  }
  /*
  props_upload = {
    onChange({ file, fileList }) {
      if (fileList.length > 3) {
        message.error("Le nombre de photos doit être de trois");
      } else {
        message.success("Le nombre de photos suffisant est atteint");
      }
    },
  };*/

  period = (date_min, date_max, frequence) => {
    let list_d1 = [];
    let list_d2 = [];
    let date_inter = "";
    let date_fin = "";
    let diff_date = 0;
    let list_finale = [];
    switch (frequence) {
      case 1:
        let d1 = moment(date_max).diff(date_min[0]._d, "days");
        diff_date = moment(date_min[1]._d).diff(date_min[0]._d, "days");
        console.log("d1", d1);
        for (let i = 1; i <= d1; i++) {
          date_inter = moment(date_min[0]._d).add(i, "days");
          date_fin = moment(date_inter).add(diff_date, "days");
          list_d1.push(date_inter._d);
          list_d2.push(date_fin._d);

          console.log("i", i);
        }
        //return list;
        list_d1.map((date, index) => console.log("liste1", index, date));
        list_d2.map((date, index) => console.log("liste2", index, date));
        list_finale = [list_d1, list_d2];
        // this.setState({ liste_finale: list_finale });
        // console.log("LISTE FINALE" + this.state.liste_finale);
        return list_finale;

      case 2:
        console.log("2");
        let d2 = moment(date_max).diff(date_min[0]._d, "weeks");
        diff_date = moment(date_min[1]._d).diff(date_min[0]._d, "days");
        console.log("diff", diff_date);
        console.log("d2", d2);
        for (let i = 1; i <= d2; i++) {
          date_inter = moment(date_min[0]._d).add(i, "weeks");
          date_fin = moment(date_inter).add(diff_date, "days");
          list_d1.push(date_inter._d);
          list_d2.push(date_fin._d);
          console.log("i", i);
        }
        //return list;
        list_d1.map((date, index) => console.log(index, date));
        list_d2.map((date, index) => console.log("liste2", index, date));
        list_finale = [list_d1, list_d2];
        //this.setState({ liste_finale: list_finale });
        return list_finale;

      case 3:
        let d3 = moment(date_max).diff(date_min[0]._d, "months");
        diff_date = moment(date_min[1]._d).diff(date_min[0]._d, "days");
        for (let i = 1; i <= d3; i++) {
          date_inter = moment(date_min[0]._d).add(i, "months");
          date_fin = moment(date_inter).add(diff_date, "days");
          list_d1.push(date_inter._d);
          list_d2.push(date_fin._d);
          console.log("i", i);
        }
        //return list;
        list_d1.map((date, index) => console.log(index, date));
        list_d2.map((date, index) => console.log("liste2", index, date));
        list_finale = [list_d1, list_d2];
        // this.setState({ liste_finale: list_finale });
        return list_finale;
    }
  };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  toggle = () => {
    this.setState({ disabled: !this.state.disabled });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      loading: false,
      date_selected: "",
      value: 0,
    });
  };
  handleCancel2 = () => {
    this.setState({
      visibl: false,
      //loading: false,
      date_selected: "",
      value: 0,
    });
  };
  remote = () => {
    this.setState({ is_remote: !this.state.is_remote });
    this.is_Remote();
  };

  list_arts_plastiques = [
    { value: "Calligraphie", label: "Calligraphie" },
    { value: "Dessin", label: "Dessin" },
    { value: "Peinture", label: "Peinture" },
    { value: "Photographie", label: "Photographie" },
    { value: "Poterie", label: "Poterie" },
    { value: "Sculpture", label: "Sculpture" },
    { value: "Vitraux", label: "Vitraux" },
  ];
  list_arts_de_scene = [
    { value: "Dance", label: "Dance" },
    { value: "Improvisation", label: "Improvisation" },
    { value: "Musique", label: "Musique" },
    { value: "Scénographie", label: "Scénographie" },
    { value: "Théâtre", label: "Théâtre" },
  ];
  list_loisirs_creatifs = [
    { value: "Bijoux", label: "Bijoux" },
    { value: "Composition florale", label: "Composition florale" },
    { value: "Crochet", label: "Crochet" },
    { value: "Couture", label: "Couture" },
    { value: "Modélisme", label: "Modélisme" },
    { value: "Stylisme", label: "Stylisme" },
    { value: "Travail du bois", label: "Travail du bois" },
    { value: "Travail du métal", label: "Travail du métal" },
    { value: "Travail du verre", label: "Travail du verre" },
    { value: "Tricot", label: "Tricot" },
  ];
  list_culinaire = [
    { value: "Cours de cuisine", label: "Cours de cuisine" },
    { value: "Dégustation", label: "Dégustation" },
    { value: "Fabrication de boisson", label: "Fabrication de boisson" },
    { value: "Pâtisserie", label: "Pâtisserie" },
  ];
  list_culture = [
    { value: "Cinéma", label: "Cinéma" },
    { value: "Concert", label: "Concert" },
    { value: "Jeux de société", label: "Jeux de société" },
    { value: "Jeux vidéo", label: "Jeux vidéo" },
    { value: "Musée", label: "Musée" },
    { value: "Opéra", label: "Opéra" },
    { value: "Philosophie", label: "Philosophie" },
    { value: "Spiritualité", label: "Spiritualité" },
  ];
  list_jeux = [
    { value: "Accrobranche", label: "Accrobranche" },
    { value: "Airsolf", label: "Airsolf" },
    { value: "Escape games", label: "Escape Games" },
    { value: "Laser games", label: "Laser games" },
    { value: "Paintball", label: "Paintball" },
    { value: "Philosophie", label: "Philosophie" },
    { value: "Spiritualite", label: "Spiritualité" },
  ];
  list_langues = [
    { value: "Anglais", label: "Anglais" },
    { value: "Arabe", label: "Arabe" },
    { value: "Chinois", label: "Chinois" },
    { value: "Espagnol", label: "Espagnol" },
    { value: "Japonais", label: "Japonais" },
    { value: "Portuguais", label: "Portuguais" },
    { value: "Russe", label: "Russe" },
  ];
  list_tours_circuits_experiences = [
    { value: "Apiculture", label: "Apiculture" },
    { value: "Aquarium", label: "Aquarium" },
    { value: "Balade en bateau", label: "Balade en bateau" },
    { value: "Balade à cheval", label: "Balade à cheval" },
    { value: "Cirque", label: "Cirque" },
    { value: "Fermes", label: "Fermes" },
    { value: "Magie", label: "Magie" },
    { value: "Maisons hantées", label: "Maisons Hantées" },
    { value: "Randonnées", label: "Randonnées" },
    { value: "Zoo", label: "Zoo" },
  ];
  list_pro = [
    { value: "Beauté", label: "Beauté" },
    { value: "Bricolage", label: "Bricolage" },
    { value: "Communication", label: "Communication" },
    { value: "Gestion", label: "Gestion" },
    { value: "Jardinage", label: "Jardinage" },
    { value: "Logiciels", label: "logiciels" },
    { value: "Management", label: "Management" },
    { value: "Médecine douce", label: "Médecine douce" },
    { value: "Mode", label: "Mode" },
    { value: "Premiers secours", label: "Premiers secours" },
    { value: "Programmation", label: "Programmation" },
    { value: "Rédaction", label: "Rédaction" },
  ];
  list_sport = [
    { value: "Aéronautiques", label: "Aéronautiques" },
    { value: "Badmington", label: "Badminton" },
    { value: "Basket", label: "Basket" },
    { value: "Boxe", label: "Boxe" },
    { value: "Crossfit", label: "Crossfit" },
    { value: "Escalade", label: "Escalade" },
    { value: "Fitness", label: "Fitness" },
    { value: "Football", label: "Football" },
    { value: "Golf", label: "Golf" },
    { value: "Handball", label: "Handball" },
    { value: "Karting", label: "Karting" },
    { value: "Montgolfiere", label: "Montgolfiere" },
    { value: "Moto", label: "Moto" },
    { value: "Natation", label: "Natation" },
    { value: "Parachutisme", label: "Parachutisme" },
    { value: "Parapente", label: "Parapente" },
    { value: "Pilates", label: "Pilates" },
    { value: "Quad", label: "Quad" },
    { value: "Saut à l'élastique", label: "Saut à l'élastique" },
    { value: "Sport de combat", label: "Sport de combat" },
    { value: "Tennis", label: "Tennis" },
    { value: "Yoga", label: "Yoga" },
    { value: "Zumba", label: "Zumba" },
  ];
  category_selector = (e) => {
    console.log("valeurs de eeeeee : " + e[0]);
    this.setState({ category: e[0] });
    switch (e[0]) {
      case "arts_plastiques":
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={this.list_arts_plastiques}
            placeholder="Sélectionner la sous-catégorie"
            filterOption={(inputValue, options) =>
              options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        );
      case "arts_de_scene":
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={this.list_arts_de_scene}
            placeholder="Sélectionner la sous-catégorie"
            filterOption={(inputValue, options) =>
              options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        );
      case "loisirs_creatifs":
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={this.list_loisirs_creatifs}
            placeholder="Sélectionner la sous-catégorie"
            filterOption={(inputValue, options) =>
              options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        );
      case "sport":
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={this.list_sport}
            placeholder="Sélectionner la sous-catégorie"
            filterOption={(inputValue, options) =>
              options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        );
      case "professionnel":
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={this.list_pro}
            placeholder="Sélectionner la sous-catégorie"
            filterOption={(inputValue, options) =>
              options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        );
      case "culinaire":
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={this.list_culinaire}
            placeholder="Sélectionner la sous-catégorie`"
            filterOption={(inputValue, options) =>
              options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        );
      case "culture":
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={this.list_culture}
            placeholder="Sélectionner la sous-catégorie"
            filterOption={(inputValue, options) =>
              options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        );
      case "linguistiques":
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={this.list_langues}
            placeholder="Sélectionner la sous-catégorie"
            filterOption={(inputValue, options) =>
              options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        );
      case "jeux":
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={this.list_jeux}
            placeholder="Sélectionner la sous-catégorie"
            filterOption={(inputValue, options) =>
              options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        );
      case "tours_circuits":
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={this.list_tours_circuits_experiences}
            placeholder="Sélectionner la sous-catégorie`"
            filterOption={(inputValue, options) =>
              options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        );
      default:
        break;
    }
  };

  level_selector = (e) => {
    console.log(
      this.state.is_beginner,
      this.state.is_intermediate,
      this.state.is_avanced
    );

    console.log("cascad", e[0]);
    switch (e[0]) {
      case "isBeginner":
        this.setState({
          is_beginner: true,
          is_intermediate: false,
          is_advanced: false,
        });
        console.log("HAWAI_begin", this.state.is_beginner);
        console.log(
          this.state.is_beginner,
          this.state.is_intermediate,
          this.state.is_avanced
        );
        break;
      case "isIntermediate":
        this.setState({
          is_advanced: false,
          is_intermediate: true,
          is_beginner: false,
        });
        console.log("HAWAI_INTER", this.state.is_intermediate);

        break;
      case "isAvanced":
        this.setState({
          is_advanced: true,
          is_intermediate: false,
          is_beginner: false,
        });
        console.log("HAWAI_AD", this.state.is_advanced);

        break;
    }
  };
  /* finale_bis = (list) => {
    
    for (
      let iteration_list1 = 0;
      iteration_list1 <= list.length;
      iteration_list1++
    ) {
      console.log("iteration1", iteration_list1, list[0][iteration_list1]);
      console.log("iteration2", iteration_list1, list[1][iteration_list1]);
    }
  };*/

  is_Remote = () => {
    if (this.state.is_remote) {
      this.isRemote = true;
      console.log("HOT: ", "true");
    } else {
      this.isRemote = false;
      console.log("HOT: ", "false");
    }
  };

  handleSub(fieldsValue) {
    console.log("SINOVAC " + this.state.liste_finale);
    //console.log("VALUE " + this.state.list_seats);
    console.log("VALUEHUIFHCJGJFGHJHJFHJF" + this.state.list_seats["00"]);
    Object.entries(this.state.list_seats).map(([key, value]) =>
      console.log("Changement de " + key + " en " + value)
    );
    //fermeture des fenetres
    this.setState({
      visible: false,
      visibl: false,
    });
    Object.entries(this.state.list_seats).map(([key, value]) =>
      console.log("Changement de " + key + " en " + value)
    );
  }
  updateSelectedValue = (value) => this.setState({ selectedValue: value });

  /*
    let list_seats = [];
    let fields_name= "";
   console.log("PREMS "+this.state.list_seats)
    // subject = ["00", "01"];
    for (let i = 0; i < this.state.liste_finale[0].length; i++) {
       for (let j = 0; j < this.state.liste_finale[0].length; j++) {
        fields_name= "fields.formItem"+ i+ j
        list_seats= [...list_seats,fields_name]  
        console.log(`${fields_name}`)
       }}
      
       */

  //const tasks = Object.values(data.tasks);

  handleSubmit(fieldsValue) {
    const convert = (input) => {
      if (input) {
        return "True";
      } else {
        return "False";
      }
    };
    console.log("FOOL");
    let date = null;
    let dateFin = null;
    let hour = null;
    let hourFin = null;
    if (fieldsValue.range_date === undefined) {
      date = this.state.courses.date;
      dateFin = this.state.courses.dateFin;
    } else {
      date = moment(fieldsValue.range_date[0]._d, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
      dateFin = moment(fieldsValue.range_date[1]._d, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
    }
    if (fieldsValue.time_picker_b === undefined) {
      hour = this.state.courses.hour;
    } else {
      hour = moment(fieldsValue.time_picker_b._d.toLocaleTimeString())
        ._i.split(":")
        .slice(0, -1)
        .join(":");
    }
    if (fieldsValue.time_picker_e === undefined) {
      hourFin = this.state.courses.hourFin;
    } else {
      hourFin = moment(fieldsValue.time_picker_e._d.toLocaleTimeString())
        ._i.split(":")
        .slice(0, -1)
        .join(":");
    }
    let category = 0;
    switch (this.state.category) {
      case "arts_plastiques":
        category = 1;
        break;

      case "arts_de_scene":
        category = 2;
        break;
      case "loisirs_creatifs":
        category = 3;
        break;
      case "professionnel":
        category = 4;
        break;
      case "culinaire":
        category = 5;
        break;
      case "culture":
        category = 6;
        break;
      case "linguistique":
        category = 7;
        break;
      case "sport":
        category = 8;
        break;
      case "jeux":
        category = 9;
        break;
      case "beaute_bien_etre":
        category = 10;
        break;
      case "tours_circuits":
        category = 11;
        break;

      default:
        break;
    }

    //console.log("RES_FINAL" + fieldsValue)
    //this.level_selector(fieldsValue.cascader_level[0]);
    // let liste = this.period();
    //console.log("listetttttt", liste);
    //this.finale_bis();
    Object.entries(this.state.list_seats).map(([key, value]) =>
      console.log("OUPSIE***:  " + key + " en " + value)
    );
    if (Object.keys(this.state.list_seats).length > 0) {
      console.log("ON Y EST ...");
      let list = [];
      //

      //data= [...state.addedItems,{course:  action.course, quantity: 1, date: action.date}]
      this.state.liste_finale[0].map((date_debut, index1) =>
        Object.entries(this.state.list_seats).map(([key, value]) =>
          moment(date_debut).format("DD/MM/YYYY") == key
            ? (list[index1] = value)
            : console.log(
                "AFFICHER LA DATE 1: " +
                  moment(date_debut).format("DD/MM/YYYY") +
                  "DATE 2: " +
                  key
              )
        )
      );

      list.map((seats, index) => console.log("LIST 2 * ETAPE2", index, seats));

      this.setState({
        list2: [this.state.liste_finale[0], this.state.liste_finale[1], list],
      });
    }

    // this.finale_bis(this.state.list2);
    /* ;*/
    // this.state.list2[0].map((seats, index) =>
    //  console.log("LIST 2", index, seats)
    //);
    console.log("remote ", this.isRemote);
    console.log(
      "date_fin:",
      moment(fieldsValue.range_date[1]._d, "DD-MM-YYYY").format("YYYY-MM-DD")
    );

    //moment(fieldsValue.range_date[0]._d.toLocaleDateString())
    //.format("YYYY/MM/DD")
    //.replace(/\//gi, "-")
    console.log("cascader:", this.is_beginner);
    console.log("imge:", fieldsValue.upload.fileList[0].originFileObj.name);
    console.log("loading", this.props.loading_add_course);
    console.log("error", this.props.error_add_course);
    console.log(
      this.state.is_beginner,
      this.state.is_intermediate,
      this.state.is_avanced
    );
    console.log(
      "time",
      moment(fieldsValue.time_picker_b._d.toLocaleTimeString())
        ._i.split(":")
        .slice(0, -1)
    );
    console.log("PRICE", parseFloat(fieldsValue.input_price));
    console.log("DISOCUNT");
    const time1 = moment(fieldsValue.time_picker_b._d.toLocaleTimeString())
      ._i.split(":")
      .slice(0, -1)
      .join(":");
    const time2 = moment(fieldsValue.time_picker_e._d.toLocaleTimeString())
      ._i.split(":")
      .slice(0, -1)
      .join(":");
    const date1 = moment(fieldsValue.range_date[0]._d, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const date2 = moment(fieldsValue.range_date[1]._d, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const date3 = (date2, date_selected) => {
      if (date_selected == "") {
        console.log("DATE3333", date2);
        return date2;
      } else {
        console.log("DATE3", typeof this.state.date_selected);
        return moment(date_selected, "DD-MM-YYYY").format("YYYY-MM-DD");
      }
    };
    console.log("USER: " + this.state.ID_user);
    console.log("type: " + typeof this.state.ID_user);

    let form_data = new FormData();
    form_data.append("accroche", fieldsValue.accroche_input);

    form_data.append("annulation", fieldsValue.annulation_input);
    form_data.append("aSavoir", fieldsValue.aSavoir_input);

    form_data.append("content", fieldsValue.description_input);
    form_data.append("date", date1);
    form_data.append("hour", time1);
    form_data.append("courseHourIsCreated", convert(true));
    form_data.append("isVerified", convert(false));
    form_data.append("isDiscounted", convert(!this.state.disabled));
    form_data.append("dateFin", date2);
    form_data.append("hourFin", time2);
    form_data.append("date_fin", date3(date2, this.state.date_selected));
    form_data.append("seats", parseFloat(fieldsValue.input_seats));
    form_data.append(
      "img1",
      fieldsValue.upload.fileList[0].originFileObj,
      fieldsValue.upload.fileList[0].originFileObj.name
    );
    form_data.append(
      "img2",
      fieldsValue.upload.fileList[1].originFileObj,
      fieldsValue.upload.fileList[1].originFileObj.name
    );
    form_data.append(
      "img3",
      fieldsValue.upload.fileList[2].originFileObj,
      fieldsValue.upload.fileList[2].originFileObj.name
    );
    form_data.append("title", fieldsValue.title_input);
    //form_data.append("content", fieldsValue.content_input);
    form_data.append("discount", parseFloat(this.state.discount));
    form_data.append("isRemote", convert(this.isRemote));
    form_data.append("price", parseFloat(fieldsValue.input_price));
    form_data.append("isIntermediate", convert(this.state.is_intermediatee));
    form_data.append("isBeginner", convert(this.state.is_beginner));
    form_data.append("isAdvanced", convert(this.state.is_advanced));
    form_data.append("value", this.state.value);
    form_data.append("age", fieldsValue.cascader_age);
    form_data.append("category", category);
    form_data.append("sub_category", fieldsValue.autocomplete);
    form_data.append("owner", localStorage.getItem("ID_user"));

    form_data.append(" courseHourIsCreated", convert(true));
    // console.log("***isIntermediate", convert(isIntermediate));
    //  console.log("****isBeginner", convert(isBeginner));
    // console.log("***isAdvanced", convert(isAdvanced));
    axios
      .post("http://localhost:8000/api-course/create/course/api/", form_data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        localStorage.setItem("course_id", res.data.id);
        localStorage.setItem("course", res.data);
        console.log("cours_ID", res.data.id);

        //dispatch(courseHoursAdded( res.data.id), date, dateFin, hour, hourFin);
        console.log("VALUE", this.state.value);
        if (this.state.value > 0) {
          for (
            let iteration_list1 = 0;
            iteration_list1 < this.state.list2[0].length;
            iteration_list1++
          ) {
            //console.log("SEATS, "+list2[2][iteration_list1]);
            let form = new FormData();
            form.append("course", res.data.id);
            form.append(
              "date",
              moment(this.state.list2[0][iteration_list1], "DD-MM-YYYY").format(
                "YYYY-MM-DD"
              )
            );
            form.append(
              "dateFin",
              moment(this.state.list2[1][iteration_list1], "DD-MM-YYYY").format(
                "YYYY-MM-DD"
              )
            );
            form.append("hour", time1);
            form.append("hourFin", time2);

            form.append("seats", this.state.list2[2][iteration_list1]);
            axios
              .post("http://localhost:8000/api-course/create/hours/", form, {
                headers: { "content-type": "multipart/form-data" },
              })
              .then((res1) => {})
              .catch((err) => {
                console.log("ERROR1", err.response);
              });

            /* courseHoursAdded( res.data.id,moment(list2[0][iteration_list1], "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),      moment(list2[1][iteration_list1], "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),
           time1,
            time2);
           /* date,
            dateFin,
            hour,
            hourFin,*/
          }
        }
        console.log("cours_ID***", res.data.id);
        console.log("time2:", time2);
        let form = new FormData();
        form.append("course", res.data.id);
        form.append("date", date1);
        form.append("dateFin", date2);
        form.append("hour", time1);
        form.append("hourFin", time2);
        form.append("seats", this.state.seats);
        axios
          .post("http://localhost:8000/api-course/create/hours/", form, {
            headers: { "content-type": "multipart/form-data" },
          })
          .then((res2) => {})
          .catch((err1) => {
            console.log("ERROR2", err1.response);
          });
      })
      .catch((err) => {
        console.log("ERROR3", err.response);
      });

    //console.log("COUSEIDDDD", course_id);
    /*if (this.state.value > 0) {
      for (
        let iteration_list1 = 0;
        iteration_list1 < this.state.list2[0].length;
        iteration_list1++
      ) {
    
        this.props.onSendNewCourseHours( course_id,moment(this.state.list2[0][iteration_list1], "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        ),      moment(this.state.list2[1][iteration_list1], "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        ),
        moment(fieldsValue.time_picker_b._d.toLocaleTimeString())
          ._i.split(":")
          .slice(0, -1)
          .join(":"),
        moment(fieldsValue.time_picker_e._d.toLocaleTimeString())
          ._i.split(":")
          .slice(0, -1)
          .join(":"))
       /* date,
        dateFin,
        hour,
        hourFin,*/
    /*  }
  
    } if (this.state.value === 0) {
      const time1=  moment(fieldsValue.time_picker_b._d.toLocaleTimeString())
      ._i.split(":")
      .slice(0, -1)
      .join(":");
      const time2= moment(fieldsValue.time_picker_e._d.toLocaleTimeString())
      ._i.split(":")
      .slice(0, -1)
      .join(":");
      console.log("time2:", time2);
   this.props.onSendNewCourseHours(course_id,  moment(fieldsValue.range_date[0]._d, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      ), moment(fieldsValue.range_date[1]._d, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      ),time1,
    time2)
    }/*
   // console.log("***LENGTH", this.state.list2[0].length);
    /*if (this.state.value > 0) {
      for (
        let iteration_list1 = 0;
        iteration_list1 < this.state.list2[0].length;
        iteration_list1++
      ) {
        if (this.props.disabled) {
          this.props.onSendNewCourse(
            fieldsValue.title_input,
            fieldsValue.content_input,
            moment(this.state.list2[0][iteration_list1], "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),
            fieldsValue.upload.fileList[0].originFileObj,
            moment(this.state.list2[1][iteration_list1], "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),
            moment(fieldsValue.time_picker_b._d.toLocaleTimeString())
              ._i.split(":")
              .slice(0, -1)
              .join(":"),
            moment(fieldsValue.time_picker_b._e.toLocaleTimeString())
              ._i.split(":")
              .slice(0, -1)
              .join(":"),
            fieldsValue.input_discount,
            this.isRemote,
            fieldsValue.input_price,
            this.state.is_intermediate,
            this.state.is_beginner,
            this.state.is_advanced
          );
        } else {
          this.props.onSendNewCourse(
            fieldsValue.title_input,
            fieldsValue.content_input,
            moment(this.state.list2[0][iteration_list1], "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),
            fieldsValue.upload.fileList[0].originFileObj,
            moment(this.state.list2[1][iteration_list1], "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            ),
            moment(fieldsValue.time_picker_b._d.toLocaleTimeString())
              ._i.split(":")
              .slice(0, -1)
              .join(":"),
            moment(fieldsValue.time_picker_e._d.toLocaleTimeString())
              ._i.split(":")
              .slice(0, -1)
              .join(":"),
            0,
            this.isRemote,
            fieldsValue.input_price,
            this.state.is_intermediate,
            this.state.is_beginner,
            this.state.is_advanced
          );
        }
      }
    } else {
      if (this.props.disabled) {
        this.props.onSendNewCourse(
          fieldsValue.title_input,
          fieldsValue.content_input,
          moment(fieldsValue.range_date[0]._d, "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
          fieldsValue.upload.fileList[0].originFileObj,
          moment(fieldsValue.range_date[1]._d, "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
          moment(fieldsValue.time_picker_b._d.toLocaleTimeString())
            ._i.split(":")
            .slice(0, -1)
            .join(":"),
          moment(fieldsValue.time_picker_b._e.toLocaleTimeString())
            ._i.split(":")
            .slice(0, -1)
            .join(":"),
          fieldsValue.input_discount,
          this.isRemote,
          fieldsValue.input_price,
          this.state.is_intermediate,
          this.state.is_beginner,
          this.state.is_advanced
        );
      } else {
        this.props.onSendNewCourse(
          fieldsValue.title_input,
          fieldsValue.content_input,
          moment(fieldsValue.range_date[0]._d, "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
          fieldsValue.upload.fileList[0].originFileObj,
          moment(fieldsValue.range_date[1]._d, "DD-MM-YYYY").format(
            "YYYY-MM-DD"
          ),
          moment(fieldsValue.time_picker_b._d.toLocaleTimeString())
            ._i.split(":")
            .slice(0, -1)
            .join(":"),
          moment(fieldsValue.time_picker_e._d.toLocaleTimeString())
            ._i.split(":")
            .slice(0, -1)
            .join(":"),
          0,
          this.isRemote,
          fieldsValue.input_price,
          this.state.is_intermediate,
          this.state.is_beginner,
          this.state.is_advanced
        );
      }
    }
*/
    /*
    const rangeValue = fieldsValue["range-picker"];
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const values = {
      ...fieldsValue,
      "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
      "date-time-picker": fieldsValue["date-time-picker"].format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      "month-picker": fieldsValue["month-picker"].format("YYYY-MM"),
      "range-picker": [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
      "range-time-picker": [
        rangeTimeValue[0].format("MM-DD-YYYY HH:mm:ss"),
        rangeTimeValue[1].format("MM-DD-YYYY HH:mm:ss"),
      ],
      "time-picker": fieldsValue["time-picker"].format("HH:mm:ss"),
    };
    console.log("Received values of form: ", values);
  };*/
  }

  render() {
    const { visible, loading, value } = this.state;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    let errorMessage = null;
    if (this.props.error_add_course) {
      errorMessage = <p>{this.props.error_add_course.message}</p>;
    }
    return (
      <>
        <BrowserView>
          <MenuBrowser width={this.state.width} />
        </BrowserView>
        <MobileView>
          <MenuMobile />
        </MobileView>
        <div
          style={{
            diplay: "flex",
            marginLeft: 20 + "%",
            width: 700,
            marginTop: "3%",
          }}
        >
          <h1 style={{ marginLeft: "4%" }}>Ajouter une Expérience</h1>
          {errorMessage}

          {this.props.loading_add_course ? (
            <Spin />
          ) : (
            <Form
              name="time_related_controls"
              {...formItemLayout}
              onSubmit={this.handleSubmit}
              onFinish={this.handleSubmit}
            >
              <Form.Item
                name="title_input"
                label="Titre"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner le titre de l'expérience",
                  },
                ]}
              >
                <Input placeholder="Ex: Cours de couture" />
              </Form.Item>

              <Form.Item
                name="accroche_input"
                label="Accroche"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner l'accroche de l'expérience",
                  },
                ]}
              >
                <Input placeholder="Ex: Cours de couture" />
              </Form.Item>
              <Form.Item
                name="aSavoir_input"
                label="A savoir"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner le champs  A savoir",
                  },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Ce qui est inclus dans le cours ou pas, le matériel nécessaire..."
                />
              </Form.Item>

              <Form.Item
                name="annulation_input"
                label="Termes d'annulation"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner vos termes d'annulation",
                  },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Ex: Ce cours ne peut être rembousé s'il n'est pas annulé au moins 24 heures avant."
                />
              </Form.Item>

              <Form.Item
                name="description_input"
                label="Description"
                rules={[
                  {
                    required: true,
                    message:
                      "Veuillez renseigner la description de l'expérience",
                  },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Ex: Ce cours est organisé dans le but d'acquérir les bases de couture, notament les techniques d'assemblage..."
                />
              </Form.Item>
              <Form.Item
                name="range_date"
                label="Date de début et de fin "
                {...rangeConfig}
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner la date de début et de fin",
                  },
                ]}
              >
                <RangePicker
                  selected={this.state.date}
                  placeholder={["Date début", "Date fin"]}
                  // showTime
                  format="DD-MM-YYYY "
                  onChange={(newDate) => this.setState({ date: newDate })}
                  //HH:mm
                  //onSelect={(this.state.date = { range_date[0] })}
                />
              </Form.Item>
              <Form.Item
                label="Heure de début"
                name="time_picker_b"
                rules={[
                  {
                    required: true,
                    message:
                      "Veuillez renseigner l'heure de début de l'expérience",
                  },
                ]}
              >
                <TimePicker format="HH:mm" placeholder="Heure de début" />
              </Form.Item>
              <Form.Item
                label="Heure de fin"
                name="time_picker_e"
                rules={[
                  {
                    required: true,
                    message:
                      "Veuillez renseigner l'heure de fin de l'expérience'",
                  },
                ]}
              >
                <TimePicker format="HH:mm" placeholder="Heure de fin" />
              </Form.Item>
              <Form.Item
                name="input_seats"
                label="Nombre de places"
                rules={[
                  {
                    required: true,
                    message:
                      "Veuillez renseigner le nombre de place(s) disponible(s) ",
                  },
                ]}
              >
                <InputNumber
                  // defaultValue={this.state.courses.seats}
                  //style={{ position: "absolute", marginLeft: 300 }}
                  onChange={(e) => {
                    this.setState({ seats: e, selectedValue: e });
                  }}
                  min={0}
                  max={10000}
                />
              </Form.Item>

              <span style={{ marginLeft: 150 }}>
                {" "}
                Périodicité:{" "}
                <Button
                  type="primary"
                  onClick={this.showModal}
                  style={{
                    marginLeft: "2%",
                    marginBottom: "4%",
                    marginTop: -60,
                  }}
                >
                  <ScheduleOutlined />
                </Button>{" "}
              </span>

              <Modal
                visible={visible}
                title="Périodicité"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" onClick={this.handleCancel}>
                    Annuler
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    //récaputulatifs
                    onClick={() => {
                      this.setState({
                        liste_finale: this.period(
                          this.state.date,
                          this.state.date_selected,
                          this.state.value
                        ),
                        visibl: true,
                      });
                    }}
                  >
                    Valider
                  </Button>,
                ]}
              >
                <Radio.Group onChange={this.onChange} value={value}>
                  <Radio style={radioStyle} value={1}>
                    Tous les jours jusqu'au
                    <DatePicker
                      name="date_max"
                      //period = (date_min, date_max, frequence)
                      onChange={(newDate) =>
                        this.setState({ date_selected: newDate })
                      }
                      //onChange={(date_max) =>
                      // this.period(this.state.date, date_max, this.state.value)
                      //}
                      style={{ marginLeft: 10 }}
                    />
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    Toutes les semaines jusqu'au
                    <DatePicker
                      // onChange={(date_max) =>
                      //  this.period(this.state.date, date_max, this.state.value)
                      // }
                      onChange={(newDate) =>
                        this.setState({ date_selected: newDate })
                      }
                      style={{ marginLeft: 10 }}
                    />
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                    Tous les mois jusqu'au
                    <DatePicker
                      onChange={(newDate) =>
                        this.setState({ date_selected: newDate })
                      }
                      // onChange={(date_max) =>
                      //  this.period(this.state.date, date_max, this.state.value)
                      // }
                      style={{ marginLeft: 10 }}
                    />
                  </Radio>
                </Radio.Group>
              </Modal>

              <Modal
                visible={this.state.visibl}
                // onOk={this.handleOk}
                onCancel={this.handleCancel2}
                title="Récapitulatif"
                footer={[,]}
              >
                {" "}
                {this.state.liste_finale.length > 0 &&
                this.state.date != [] &&
                this.state.visibl ? (
                  <div>
                    {this.state.liste_finale[0].map(
                      (date1, index1) => (
                        (this.state.list_seats[
                          moment(date1).format("DD/MM/YYYY")
                        ] = this.state.selectedValue),
                        (
                          //this.state.liste_finale[1].map((date2, index2) => (
                          <div key={"div_" + index1}>
                            <Form
                              initialValues={{
                                names: this.state.selectedValue,
                              }}
                            >
                              {"Du " +
                                moment(date1).format("DD/MM/YYYY") +
                                " au " +
                                moment(
                                  this.state.liste_finale[1][index1]
                                ).format("DD/MM/YYYY")}

                              <Form.Item
                                key={index1}
                                name="names"
                                label="Place(s)"
                              >
                                <Input
                                  id={`${index1}`}
                                  //defaultValue={this.state.selectedValue}
                                  onChange={(e) => {
                                    this.state.list_seats[
                                      moment(date1).format("DD/MM/YYYY")
                                    ] = e.target.value;
                                    //obj.key3 = "value3";
                                    //this.setState(
                                    //update(this.state.list_seat, {
                                    //[moment(date1).format("DD/MM/YYYY")]: {
                                    //$set: e.target.value,
                                  }}
                                  //this.state.list_seats[
                                  // moment(date1).format("DD/MM/YYYY")
                                  // ] = e.target.value;

                                  //onChange= {(e)=>{this.setState({list_seats: [...this.state.list_seats, e]})}}
                                  type="integer"
                                  //ref={this.input}
                                />
                              </Form.Item>
                            </Form>
                          </div>
                        )
                      )
                      // )
                      // )
                    )}{" "}
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={this.handleSub}
                    >
                      Submit
                    </Button>
                    <Button key="back" onClick={this.handleCancel2}>
                      Annuler
                    </Button>
                  </div>
                ) : (
                  <div> Veuillez renseigner une date de fin valide</div>
                )}
              </Modal>

              <Form.Item
                rules={[
                  { required: true, message: "Veuillez importer trois images" },
                ]}
                name="upload"
                label="Image"
              >
                <Upload
                  //{...this.props_upload}
                  maxCount={3}
                  listType="picture"
                  multiple
                  accept=".jpeg, .png"
                  beforeUpload={() => false}
                >
                  <Button>
                    <UploadOutlined /> Choisir 3 images
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item name="switch_discount" label="Réduction">
                <Switch onClick={this.toggle} />
                {this.state.disabled ? (
                  <></>
                ) : (
                  <Form.Item name="input_discount">
                    <InputNumber
                      style={{
                        top: -20 + "px",
                        right: -50 + "px",
                      }}
                      min={0}
                      max={1000}
                      onChange={(e) => this.setState({ discount: e })}
                    />
                  </Form.Item>
                )}
              </Form.Item>

              <Form.Item name="switch_remote" label="Activité en ligne">
                <Switch onClick={this.remote} />
              </Form.Item>
              <Form.Item
                name="input_price"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner le prix ",
                  },
                ]}
                label="Prix"
              >
                <InputNumber
                  //defaultValue={this.state.courses.price}
                  // style={{ position: "absolute", marginLeft: 300 }}
                  min={0}
                  max={10000}
                />
              </Form.Item>

              <Form.Item
                name="cascader_age"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner la catégorie d'âge ",
                  },
                ]}
                label="Age"
              >
                <Cascader
                  // value={this.state.input}
                  // onChange={(e) => this.level_selector(e)}
                  style={{ width: 300 }}
                  options={age}
                  placeholder="Sélectionner l'âge"
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner le niveau",
                  },
                ]}
                name="cascader_level"
                label="Niveau"
              >
                <Cascader
                  value={this.state.input}
                  onChange={(e) => this.level_selector(e)}
                  style={{ width: 300 }}
                  options={options}
                  placeholder="Sélectionner le niveau"
                />
              </Form.Item>
              <Form.Item
                name="cascader_category"
                label="Catégorie"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner la catégorie de l'expérience",
                  },
                ]}
              >
                <Cascader
                  //value={this.state.input}
                  //(newDate) =>
                  // this.setState({ date_selected: newDate })
                  onChange={(value_cascader) =>
                    this.setState({
                      element: this.category_selector(value_cascader),
                    })
                  }
                  style={{ width: 300 }}
                  options={category}
                  placeholder="Sélectionner la catégorie"
                />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message:
                      "Veuillez renseigner la sous-catégorie de l'expérience",
                  },
                ]}
                name="autocomplete"
              >
                {this.state.element}
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  xs: {
                    span: 24,
                    offset: 0,
                  },
                  sm: {
                    span: 16,
                    offset: 8,
                  },
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>{" "}
        <Footer width={this.state.width} />
      </>
    );
  }
}

export default CourseForm;
