import React from "react";

import axios from "axios";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import MenuBrowser from "./MenuBrowser";

import Footer from "./Footer";
import { BrowserView, MobileView } from "react-device-detect";
import {
  ScheduleOutlined,
  MenuOutlined,
  UserOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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
import dayjs from "dayjs";
const CoursesCheck = () => {
  const toggle = () => {
    setDisabled(!disabled);
  };
  const onChangeValue = (e) => {
    console.log("radio checked" + e.target.value);
    setValue(e.target.value);
    console.log("VALUE " + value);
    setChangeValue(true);
  };
  const handleSub = () => {
    //console.log("SINOVAC " + liste_finale);

    //console.log("VALUE " + this.state.list_seats);
    //console.log("VALUEHUIFHCJGJFGHJHJFHJF" + list_seats);
    Object.entries(list_seats).map(([key, value]) =>
      console.log("Changement de " + key + " en " + value)
    );
    //fermeture des fenetres
    setVisibl(false);
    setVisible(false);
    Object.entries(list_seats).map(([key, value]) =>
      console.log("Changement de " + key + " en " + value)
    );
  };
  const period = (date_min, date_max) => {
    console.log("frequence" + value);
    let list_d1 = [];
    let list_d2 = [];
    let date_inter = "";
    let date_fin = "";
    let diff_date = 0;
    let list_finale = [];
    switch (value) {
      case 1:
        console.log("DATE MIN " + date_min._d);
        console.log("DATE MAX " + date_max._d);
        let d1 = dayjs(date_max._d).diff(date_min._d, "days");
        diff_date = dayjs(date_min._d).diff(date_min._d, "days");
        console.log("d1", d1);
        for (let i = 1; i <= d1; i++) {
          date_inter = dayjs(date_min._d).add(i, "days");
          date_fin = dayjs(date_inter).add(diff_date, "days");
          console.log("DATES 1: " + date_inter._d + "2: " + date_fin._d);
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
        setListe_finale(list_finale);
        console.log("LISTE FINALE " + JSON.stringify(list_finale));
        break;
      case 2:
        console.log("2");
        let d2 = dayjs(date_max._d).diff(date_min._d, "weeks");
        diff_date = dayjs(date_min._d).diff(date_min._d, "days");
        console.log("diff", diff_date);
        console.log("d2", d2);
        for (let i = 1; i <= d2; i++) {
          date_inter = dayjs(date_min._d).add(i, "weeks");
          date_fin = dayjs(date_inter).add(diff_date, "days");
          list_d1.push(date_inter._d);
          list_d2.push(date_fin._d);
          console.log("i", i);
        }
        //return list;
        list_d1.map((date, index) => console.log(index, date));
        list_d2.map((date, index) => console.log("liste2", index, date));
        list_finale = [list_d1, list_d2];
        //this.setState({ liste_finale: list_finale });
        setListe_finale(list_finale);
        break;
      case 3:
        let d3 = dayjs(date_max._d).diff(date_min._d, "months");
        diff_date = dayjs(date_min._d).diff(date_min._d, "days");
        for (let i = 1; i <= d3; i++) {
          date_inter = dayjs(date_min._d).add(i, "months");
          date_fin = dayjs(date_inter).add(diff_date, "days");
          list_d1.push(date_inter._d);
          list_d2.push(date_fin._d);
          console.log("i", i);
        }
        //return list;
        list_d1.map((date, index) => console.log(index, date));
        list_d2.map((date, index) => console.log("liste2", index, date));
        list_finale = [list_d1, list_d2];
        // this.setState({ liste_finale: list_finale });
        setListe_finale(list_finale);
        break;
      default:
        console.log("BLABLA" + value);
        break;
    }
  };

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  const list_arts_plastiques = [
    { value: "Calligraphie", label: "Calligraphie" },
    { value: "Dessin", label: "Dessin" },
    { value: "Peinture", label: "Peinture" },
    { value: "Photographie", label: "Photographie" },
    { value: "Poterie", label: "Poterie" },
    { value: "Sculpture", label: "Sculpture" },
    { value: "Vitraux", label: "Vitraux" },
  ];
  const list_arts_de_scene = [
    { value: "Dance", label: "Dance" },
    { value: "Improvisation", label: "Improvisation" },
    { value: "Musique", label: "Musique" },
    { value: "Scénographie", label: "Scénographie" },
    { value: "Théâtre", label: "Théâtre" },
  ];
  const list_loisirs_creatifs = [
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
  const list_culinaire = [
    { value: "Cours de cuisine", label: "Cours de cuisine" },
    { value: "Dégustation", label: "Dégustation" },
    { value: "Fabrication de boisson", label: "Fabrication de boisson" },
    { value: "Pâtisserie", label: "Pâtisserie" },
  ];
  const list_culture = [
    { value: "Cinéma", label: "Cinéma" },
    { value: "Concert", label: "Concert" },
    { value: "Jeux de société", label: "Jeux de société" },
    { value: "Jeux vidéo", label: "Jeux vidéo" },
    { value: "Musée", label: "Musée" },
    { value: "Opéra", label: "Opéra" },
    { value: "Philosophie", label: "Philosophie" },
    { value: "Spiritualité", label: "Spiritualité" },
  ];
  const list_jeux = [
    { value: "Accrobranche", label: "Accrobranche" },
    { value: "Airsolf", label: "Airsolf" },
    { value: "Escape games", label: "Escape Games" },
    { value: "Laser games", label: "Laser games" },
    { value: "Paintball", label: "Paintball" },
    { value: "Philosophie", label: "Philosophie" },
    { value: "Spiritualite", label: "Spiritualité" },
  ];
  const list_langues = [
    { value: "Anglais", label: "Anglais" },
    { value: "Arabe", label: "Arabe" },
    { value: "Chinois", label: "Chinois" },
    { value: "Espagnol", label: "Espagnol" },
    { value: "Japonais", label: "Japonais" },
    { value: "Portuguais", label: "Portuguais" },
    { value: "Russe", label: "Russe" },
  ];
  const list_tours_circuits_experiences = [
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
  const list_pro = [
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
  const list_sport = [
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

  const category_courseDetails = (cat) => {
    switch (cat) {
      case 1:
        return "arts_plastiques";
      case 2:
        return "arts_de_scene";
      case 3:
        return "loisirs_creatifs";
      case 4:
        return "professionnel";
      case 5:
        return "culinaire";
      case 6:
        return "culture";
      case 7:
        return "linguistique";
      case 8:
        return "sport";
      case 9:
        return "jeux";
      case 10:
        return "beaute_bien_etre";
      case 11:
        return "tours_circuits";

      default:
        break;
    }
  };

  const category_selector = (e) => {
    setCategory(e[0]);
    switch (e[0]) {
      case "arts_plastiques" || 1:
        setCategoryFinale(1);
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={list_arts_plastiques}
            placeholder="Sélectionner la sous-catégorie"
            // defaultValue={[courseDetails.sub_category]}
          />
        );
      case "arts_de_scene" || 2:
        setCategoryFinale(2);
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={list_arts_de_scene}
            placeholder="Sélectionner la sous-catégorie"
            // defaultValue={[courseDetails.sub_category]}
          />
        );
      case "loisirs_creatifs" || 3:
        setCategoryFinale(3);
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={list_loisirs_creatifs}
            placeholder="Sélectionner la sous-catégorie"
            //  defaultValue={[courseDetails.sub_category]}
          />
        );
      case "sport" || 8:
        setCategoryFinale(8);
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={list_sport}
            placeholder="Sélectionner la sous-catégorie"
            // defaultValue={[courseDetails.sub_category]}
          />
        );
      case "professionnel" || 4:
        setCategoryFinale(4);
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={list_pro}
            placeholder="Sélectionner la sous-catégorie"
            //   defaultValue={[courseDetails.sub_category]}
          />
        );
      case "culinaire" || 5:
        setCategoryFinale(5);
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={list_culinaire}
            placeholder="Sélectionner la sous-catégorie`"
            // defaultValue={[courseDetails.sub_category]}
          />
        );
      case "culture" || 6:
        setCategoryFinale(6);
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={list_culture}
            placeholder="Sélectionner la sous-catégorie"
            // defaultValue={[courseDetails.sub_category]}
          />
        );
      case "linguistique" || 7:
        setCategoryFinale(7);
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={list_langues}
            placeholder="Sélectionner la sous-catégorie"
            //  defaultValue={[courseDetails.sub_category]}
          />
        );
      case "jeux" || 9:
        setCategoryFinale(9);
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={list_jeux}
            placeholder="Sélectionner la sous-catégorie"
            // defaultValue={[courseDetails.sub_category]}
          />
        );
      case "tours_circuits" || 11:
        setCategoryFinale(11);
        return (
          <AutoComplete
            style={{ top: -57, width: 200, right: -550 }}
            options={list_tours_circuits_experiences}
            placeholder="Sélectionner la sous-catégorie`"
            //  defaultValue={[courseDetails.sub_category]}
          />
        );
      default:
        break;
    }
  };
  const list_category = [
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

  const [width, setWidth] = useState(window.innerWidth);
  const [selectedValue, setSelectedValue] = useState(0);
  const [date, setDate] = useState([]);
  const [liste_finale, setListe_finale] = useState([]);
  const [element, setElement] = useState(null);
  const [category, setCategory] = useState(null);
  const [date_selected, setDate_selected] = useState("");
  const [visible, setVisible] = useState(null);
  const [visibl, setVisibl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [list_seats, setList_seats] = useState([]);
  const [list2, setList2] = useState([]);
  const [dateFin, setDateFin] = useState("");
  const [seats, setSeats] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [courseDetails, setCourseDetails] = useState(null);
  const [hours, setHours] = useState(null);
  const [categoryFinale, setCategoryFinale] = useState(0);
  const [imgs, setImgs] = useState(false);
  const [changeValue, setChangeValue] = useState(false);
  const [isInterm, setInterm] = useState(false);
  const [isBeg, setIsBegin] = useState(false);
  const [isAd, setIsAd] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel2 = () => {
    setVisibl(false);
    //loading: false,

    //setValue(0);
  };

  const handleOk = () => {
    setLoading(true);
  };
  const handleCancel = () => {
    setVisible(false);
    setLoading(false);
    // setValue(0);

    setDate_selected("");
  };
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
  function updateSize() {
    setWidth(window.innerWidth);
    console.log(window.innerWidth);
  }
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const params = useParams();
  async function first_function() {
    const courseID = params["courseID"];
    try {
      const res = await axios.get(
        `http://localhost:8000/api-course/${courseID}`
      );
      const res2 = await axios.get(
        `http://localhost:8000/api-course/hours/${courseID}`
      );
      setDate_selected(res.data.value !== 0 ? dayjs(res.data.date_fin) : "");
      setDate(dayjs(res.data.date));
      setDateFin(dayjs(res.data.dateFin));
      setValue(res.data.value);
      setCourseDetails(res.data);
      setCategoryFinale(res.data.category);
      setSelectedValue(res.data.seats);
      //setValue(res.data.value);
      setSeats(res.data.seats);

      if (res2) {
        setHours(res2.data);
        console.log("HOURSHOURSHOURS" + res2.data[0].seats);
      }

      courseDetails.isAdvanced
        ? setIsAd(true)
        : courseDetails.isBeginner
        ? setIsBegin(true)
        : setInterm(true);

      //setCategory(category_courseDetails(res.data.category));

      //console.log("RES 3   " + JSON.stringify(course));
    } catch (error) {
      console.log(error);
    }
  }
  async function getItNow() {
    await first_function().then(async () => {
      console.log(hours);
      console.log(courseDetails);
    });
    // console.log("HEY, PARAMS: " + JSON.stringify(params["courseID"]));
  }
  useEffect(() => {
    //await ().then(async () => {

    getItNow();
  }, [getItNow]);
  const convert = (input) => {
    if (input) {
      return "True";
    } else {
      return "False";
    }
  };
  const onFinish = (values) => {
    console.log("CASCADER **** " + values.cascader_level[0]);

    axios
      .delete(`http://localhost:8000/api-course/hours/${params["courseID"]}`, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => console.log("***ALL IS DONE****"))
      .catch((err) => console.log(err));
    console.log("IMAGE " + courseDetails.img1);
    console.log("ACTIVITE *** " + values.cascader_category);

    console.log("SET ACTIVITE FINALE" + categoryFinale);

    const date1 = dayjs(values.range_date_debut._d, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const date2 = dayjs(values.range_date_fin._d, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const date3 = (date2, date_selected) => {
      if (date_selected === "") {
        console.log("DATE3333", date2);
        return date2;
      } else {
        console.log("DATE3", typeof date_selected);
        return dayjs(date_selected, "DD-MM-YYYY").format("YYYY-MM-DD");
      }
    };

    //console.log("RES_FINAL" + fieldsValue)
    //this.level_selector(fieldsValue.cascader_level[0]);
    // let liste = this.period();
    //console.log("listetttttt", liste);
    //this.finale_bis();

    console.log("LIST SEATS ** = " + Object.keys(list_seats).length);
    Object.entries(list_seats).map(([key, value]) =>
      console.log("OUPSIE***:  " + key + " en " + value)
    );
    if (Object.keys(list_seats).length > 0) {
      console.log("ON Y EST ...");
      let list = [];
      //

      //data= [...state.addedItems,{course:  action.course, quantity: 1, date: action.date}]
      liste_finale[0].map((date_debut, index1) =>
        Object.entries(list_seats).map(([key, value]) =>
          dayjs(date_debut).format("DD/MM/YYYY") === key
            ? (list[index1] = value)
            : console.log(
                "AFFICHER LA DATE 1: " +
                  dayjs(date_debut).format("DD/MM/YYYY") +
                  "DATE 2: " +
                  key
              )
        )
      );

      list.map((seats, index) => console.log("LIST 2 * ETAPE2", index, seats));
      list2[0] = liste_finale[0];
      list2[1] = liste_finale[1];
      list2[2] = list;
      setList2([liste_finale[0], liste_finale[1], list]);
      console.log("LISTE 2 " + Object.keys(list2).length);
    }

    console.log(
      "time",
      dayjs(values.time_picker_b._d.toLocaleTimeString())
        ._i.split(":")
        .slice(0, -1)
    );
    console.log("PRICE", parseFloat(values.input_price));
    console.log("DISOCUNT");
    const time1 = dayjs(values.time_picker_b._d.toLocaleTimeString())
      ._i.split(":")
      .slice(0, -1)
      .join(":");
    const time2 = dayjs(values.time_picker_e._d.toLocaleTimeString())
      ._i.split(":")
      .slice(0, -1)
      .join(":");

    // console.log("USER: " + localStorage.getItem("ID_user"));
    // console.log("type: " + typeof ID_user);

    console.log(values.title_input);
    console.log(values.input_price);
    //console.log(values.upload.fileList[0].originFileObj.name);
    console.log(
      "HOUR " +
        dayjs(values.time_picker_b._d.toLocaleTimeString())
          ._i.split(":")
          .slice(0, -1)
          .join(":")
    );
    console.log(dayjs(values.range_date_debut._d).format("DD/MM/YYYY"));
    console.log(values.autocomplete);
    let form_data = new FormData();
    form_data.append("accroche", values.accroche_input);
    console.log("LEVEL " + values.cascader_level[0]);
    form_data.append("annulation", values.annulation_input);
    form_data.append("aSavoir", values.aSavoir_input);
    form_data.append("date", date1);
    form_data.append(
      "hour",
      dayjs(values.time_picker_b._d.toLocaleTimeString())
        ._i.split(":")
        .slice(0, -1)
        .join(":")
    );
    // form_data.append("courseHourIsCreated", "True");
    form_data.append("coursesID", params["courseID"]);
    form_data.append("isVerified", "False");
    form_data.append("isDiscounted", convert(values.switch_discount));
    form_data.append("dateFin", date2);
    form_data.append(
      "hourFin",
      dayjs(values.time_picker_e._d.toLocaleTimeString())
        ._i.split(":")
        .slice(0, -1)
        .join(":")
    );
    form_data.append("date_fin", date3(date2, date_selected));
    form_data.append("seats", parseFloat(values.input_seats));
    console.log("***" + values.upload);
    if (typeof values.upload !== "undefined" || null) {
      form_data.append(
        "img1",
        values.upload.fileList[0].originFileObj,
        values.upload.fileList[0].originFileObj.name
      );
      form_data.append(
        "img2",
        values.upload.fileList[1].originFileObj,
        values.upload.fileList[1].originFileObj.name
      );
      form_data.append(
        "img3",
        values.upload.fileList[2].originFileObj,
        values.upload.fileList[2].originFileObj.name
      );
    }
    //console.log("AGE EE" + values.cascader_age);
    form_data.append("title", values.title_input);
    form_data.append("content", values.description_input);
    form_data.append("discount", discount);
    form_data.append("isRemote", convert(values.switch_remote));
    form_data.append("price", parseFloat(values.input_price));

    form_data.append("isIntermediate", convert(isInterm));
    form_data.append("isBeginner", convert(isBeg));
    form_data.append("isAdvanced", convert(isAd));

    form_data.append("value", value);
    form_data.append("age", values.cascader_age);
    form_data.append("category", categoryFinale);

    values.autocomplete != null
      ? form_data.append("sub_category", values.autocomplete)
      : form_data.append("sub_category", courseDetails.sub_category);
    form_data.append("owner", 1);

    form_data.append(" courseHourIsCreated", "True");
    // console.log("***isIntermediate", convert(isIntermediate));
    //  console.log("****isBeginner", convert(isBeginner));
    // console.log("***isAdvanced", convert(isAdvanced));
    axios
      .post(
        `http://localhost:8000/api-course/update/verify/admin/${params["courseID"]}`,

        form_data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        // localStorage.setItem("course_id", res.data.id);
        //localStorage.setItem("course", res.data);
        // console.log("cours_ID", res.data.id);

        //dispatch(courseHoursAdded( res.data.id), date, dateFin, hour, hourFin);
        console.log("VALUE", value);
        console.log("LENGTH" + list2);
        if (value > 0 && changeValue) {
          for (
            let iteration_list1 = 0;
            iteration_list1 < list2[0].length;
            iteration_list1++
          ) {
            //console.log("SEATS, "+list2[2][iteration_list1]);
            let form = new FormData();
            form.append("course", params["courseID"]);
            form.append(
              "date",
              dayjs(list2[0][iteration_list1], "DD-MM-YYYY").format(
                "YYYY-MM-DD"
              )
            );
            form.append(
              "dateFin",
              dayjs(list2[1][iteration_list1], "DD-MM-YYYY").format(
                "YYYY-MM-DD"
              )
            );
            form.append("hour", time1);
            form.append("hourFin", time2);

            form.append("seats", list2[2][iteration_list1]);
            axios
              .post("http://localhost:8000/api-course/create/hours/", form, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((res1) => {})
              .catch((err) => {
                console.log("ERROR1", err.response);
              });
          }
        }
      });
  };
  if (courseDetails && hours) {
    return (
      <div className="page">
        <BrowserView>
          <MenuBrowser width={width} />
        </BrowserView>
        <div
          className="Form"
          style={{
            diplay: "flex",
            marginLeft: 20 + "%",
            width: 700,
            marginTop: "3%",
          }}
        >
          <h1 style={{ marginLeft: "4%" }}>Modifier une Expérience</h1>
          <Form
            onFinish={onFinish}
            {...formItemLayout}
            initialValues={{
              title_input: courseDetails.title,
              accroche_input: courseDetails.accroche,
              aSavoir_input: courseDetails.aSavoir,
              annulation_input: courseDetails.annulation,
              description_input: courseDetails.content,
              input_seats: courseDetails.seats,
              input_price: courseDetails.price,
              range_date_debut: dayjs(courseDetails.date),
              range_date_fin: dayjs(courseDetails.dateFin),
              time_picker_b: dayjs(courseDetails.hour, "HH:mm"),
              time_picker_e: dayjs(courseDetails.hourFin, "HH:mm"),
              cascader_age: [courseDetails.age],
              cascader_level: courseDetails.isAdvanced
                ? ["isAdvanced"]
                : courseDetails.isBeginner
                ? ["isBeginner"]
                : ["isIntermediate"],
              cascader_category: [
                category_courseDetails(courseDetails.category),
              ],
              //   autocomplete: [courseDetails.sub_category],
            }}
          >
            <Form.Item name="title_input" label="Titre">
              <Input
                // value={courseDetails.title}
                placeholder="Ex: Cours de couture"
              />
            </Form.Item>
            <Form.Item name="accroche_input" label="Accroche">
              <Input placeholder="Ex: Cours de couture" />
            </Form.Item>
            <Form.Item name="aSavoir_input" label="A savoir">
              <Input
                rows={6}
                placeholder="Ce qui est inclus dans le cours ou pas, le matériel nécessaire..."
              />
            </Form.Item>
            <Form.Item name="annulation_input" label="Termes d'annulation">
              <Input
                rows={6}
                placeholder="Ex: Ce cours ne peut être remboursé s'il n'est pas annulé au moins 24 heures avant."
              />
            </Form.Item>

            <Form.Item name="description_input" label="Description">
              <Input
                rows={6}
                placeholder="Ex: Ce cours est organisé dans le but d'acquérir les bases de couture, notament les techniques d'assemblage..."
              />
            </Form.Item>
            <Form.Item name="range_date_debut" label="Date de début ">
              <DatePicker
                // selected={date}
                placeholder={["Date de début"]}
                //defaultValue={}
                format="DD-MM-YYYY "
                onChange={(newDate) => setDate(newDate)}
              />
            </Form.Item>
            <Form.Item name="range_date_fin" label="Date de fin ">
              <DatePicker
                // selected={date}
                placeholder={["Date de fin"]}
                //defaultValue={moment(courseDetails.dateFin)}
                format="DD-MM-YYYY "
                onChange={(newDate) => setDateFin(newDate)}
              />
            </Form.Item>
            <Form.Item label="Heure de début" name="time_picker_b">
              <TimePicker
                //defaultValue={moment(courseDetails.hour, "HH:mm")}
                format="HH:mm"
                placeholder="Heure de début"
              />
            </Form.Item>
            <Form.Item label="Heure de fin" name="time_picker_e">
              <TimePicker
                //defaultValue={}
                format="HH:mm"
                placeholder="Heure de fin"
              />
            </Form.Item>
            <Form.Item name="input_seats" label="Nombre de places">
              <InputNumber
                //defaultValue={courseDetails.seats}
                onChange={(e) => {
                  setSeats(e);
                  setSelectedValue(e);
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
                onClick={showModal}
                style={{
                  marginLeft: "2%",
                  marginBottom: "4%",
                  marginTop: -60,
                }}
              >
                <ScheduleOutlined />
              </Button>{" "}
            </span>
            <Form.Item name="upload" label="Image">
              <Upload
                //{...this.props_upload}
                defaultFileList={[
                  {
                    uid: "-1",
                    name: "image1.png",
                    status: "done",
                    url: courseDetails.img1,
                    thumbUrl: courseDetails.img1,
                  },
                  {
                    uid: "-2",
                    name: "image2.png",
                    status: "done",
                    url: courseDetails.img2,
                    thumbUrl: courseDetails.img2,
                  },
                  {
                    uid: "-3",
                    name: "image3.png",
                    status: "done",
                    url: courseDetails.img3,
                    thumbUrl: courseDetails.img3,
                  },
                ]}
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
            <Form.Item valuePropName="switch_discount" label="Réduction">
              <Switch
                onChange={toggle}
                defaultChecked={courseDetails.isDiscounted}
              />
            </Form.Item>
            {courseDetails.isDiscounted || disabled ? (
              <Form.Item valuePropName="input_discount">
                <InputNumber
                  defaultValue={courseDetails.discount}
                  style={{
                    top: -50 + "px",
                    right: -300 + "px",
                  }}
                  min={0}
                  max={1000}
                  onChange={(e) => setDiscount(e)}
                />
              </Form.Item>
            ) : (
              <></>
            )}

            <Form.Item name="switch_remote" label="Activité en ligne">
              <Switch defaultChecked={courseDetails.isRemote} />
            </Form.Item>
            <Form.Item name="input_price" label="Prix">
              <InputNumber
                //defaultValue={this.state.courses.price}
                // style={{ position: "absolute", marginLeft: 300 }}
                min={0}
                max={10000}
              />
            </Form.Item>
            <Form.Item name="cascader_age" label="Age">
              <Cascader
                options={age}
                style={{ width: 300 }}
                placeholder="Sélectionner l'âge"
                //   defaultValue={courseDetails.age}
              />
            </Form.Item>
            <Form.Item name="cascader_level" label="Niveau">
              <Cascader
                //value={input}
                //  onChange={(e) => level_selector(e)}
                style={{ width: 300 }}
                options={options}
                placeholder="Sélectionner le niveau"
              />
            </Form.Item>
            <Form.Item name="cascader_category" label="Catégorie">
              <Cascader
                onChange={(value_cascader) =>
                  setElement(category_selector(value_cascader))
                }
                style={{ width: 300 }}
                options={list_category}
                placeholder="Sélectionner la catégorie"
              />
            </Form.Item>
            <Form.Item name="autocomplete">
              {element && category != null ? (
                element
              ) : (
                <Input
                  style={{ top: -57, width: 200, right: -550 }}
                  defaultValue={courseDetails.sub_category}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <>
          {" "}
          <Modal
            visible={visible}
            title="Périodicité"
            onOk={handleOk}
            //destroyOnClose={true}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Annuler
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                //récaputulatifs
                onClick={() => {
                  console.log("DATE " + date._d);
                  console.log(dateFin._d);
                  console.log(date_selected._d);
                  console.log(value);

                  period(date, date_selected);

                  console.log(liste_finale);
                  setVisibl(true);
                }}
              >
                Valider
              </Button>,
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                onChangeValue(e);
              }}
              // value={courseDetails.value}
              // defaultValue={courseDetails.value}
            >
              <Radio style={radioStyle} value={1}>
                Tous les jours jusqu'au
                <DatePicker
                  format="DD-MM-YYYY "
                  defaultValue={
                    courseDetails.value === 1
                      ? dayjs(courseDetails.date_fin)
                      : null
                  }
                  name="date_max"
                  //period = (date_min, date_max, frequence)
                  onChange={(newDate) => setDate_selected(newDate)}
                  //onChange={(date_max) =>
                  // this.period(this.state.date, date_max, this.state.value)
                  //}
                  style={{ marginLeft: 10 }}
                />
              </Radio>
              <Radio style={radioStyle} value={2}>
                Toutes les semaines jusqu'au
                <DatePicker
                  format="DD-MM-YYYY "
                  // onChange={(date_max) =>
                  //  this.period(this.state.date, date_max, this.state.value)
                  // }
                  defaultValue={
                    courseDetails.value === 2
                      ? dayjs(courseDetails.date_fin)
                      : null
                  }
                  onChange={(newDate) => setDate_selected(newDate)}
                  style={{ marginLeft: 10 }}
                />
              </Radio>
              <Radio style={radioStyle} value={3}>
                Tous les mois jusqu'au
                <DatePicker
                  format="DD-MM-YYYY "
                  defaultValue={
                    courseDetails.value === 3
                      ? dayjs(courseDetails.date_fin)
                      : null
                  }
                  onChange={(newDate) => setDate_selected(newDate)}
                  // onChange={(date_max) =>
                  //  this.period(this.state.date, date_max, this.state.value)
                  // }
                  style={{ marginLeft: 10 }}
                />
              </Radio>
            </Radio.Group>
          </Modal>
          <Modal
            visible={visibl}
            // onOk={this.handleOk}
            onCancel={handleCancel2}
            title="Récapitulatif"
            footer={[]}
          >
            {liste_finale.length > 0 && date != [] && visibl ? (
              <div>
                {liste_finale[0].map(
                  (date1, index1) => (
                    (list_seats[dayjs(date1).format("DD/MM/YYYY")] =
                      selectedValue),
                    (
                      //this.state.liste_finale[1].map((date2, index2) => (
                      <div key={"div_" + index1}>
                        <Form
                          initialValues={{
                            names:
                              courseDetails.value !== 0 &&
                              courseDetails.value === value &&
                              hours != null &&
                              typeof hours !== "undefined"
                                ? hours[index1].seats
                                : selectedValue,
                          }}
                        >
                          {"Du " +
                            dayjs(date1).format("DD/MM/YYYY") +
                            " au " +
                            dayjs(liste_finale[1][index1]).format("DD/MM/YYYY")}

                          <Form.Item key={index1} name="names" label="Place(s)">
                            <Input
                              id={index1}
                              //defaultValue={}
                              onChange={(e) => {
                                list_seats[dayjs(date1).format("DD/MM/YYYY")] =
                                  e.target.value;
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
                              // type="integer"
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
                <Button type="primary" htmlType="submit" onClick={handleSub}>
                  Submit
                </Button>
                <Button key="back" onClick={handleCancel2}>
                  Annuler
                </Button>
              </div>
            ) : (
              <div> Veuillez renseigner une date de fin valide</div>
            )}
          </Modal>
        </>
        <Footer width={width} />
      </div>
    );
  } else {
    return <>Loading..</>;
  }
};

export default CoursesCheck;
