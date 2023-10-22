import React, { useEffect, useState } from "react";
import {
  HeartFilled,
  BarChartOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Typography, Row, Col, List, Avatar, Divider } from "antd";
import logo from "./img/adrien.jpg";
import { MonthFrequency } from "./App";
import api from "./axios/axios.config";
import { monthTodisplay } from "./data/months";
import Alert from "antd/es/alert/Alert";

const { Title, Paragraph } = Typography;
export interface MonthToDisplay {
  month: string;
  totalWeek: number;
}

export interface MonthsFequencyToDisplay {
  month: string;
  pourcentage: number;
}

const getPourcentageOfFrenquency = (totalWeek: number, dayReserved: number) => {
  if (totalWeek === 0) {
    return 0;
  }
  return Math.round((dayReserved / totalWeek) * 100);
};

const getColorOfPourcentage = (pourcentage: number) => {
  if (pourcentage >= 75) {
    return "#87d068";
  }

  if (pourcentage >= 50) {
    return "#108ee9";
  }
  if (pourcentage >= 25) {
    return "#f50";
  }

  return "grey";
};
const setMonthFrenquencyWithPourcentage = (
  MonthToDisplay: MonthToDisplay[],
  monthFrequency: MonthFrequency[]
): MonthsFequencyToDisplay[] => {
  const monthsFequencyToDisplay: MonthsFequencyToDisplay[] = [];
  MonthToDisplay.forEach((month) => {
    const monthFrequencyFound = monthFrequency.find(
      (monthFrenquency) =>
        monthFrenquency.month.toLocaleUpperCase() ===
        month.month.toLocaleUpperCase()
    );

    if (monthFrequencyFound) {
      monthsFequencyToDisplay.push({
        month: month.month,
        pourcentage: getPourcentageOfFrenquency(
          month.totalWeek,
          parseInt(monthFrequencyFound.jours)
        ),
      });
    } else {
      monthsFequencyToDisplay.push({
        month: month.month,
        pourcentage: 0,
      });
    }
  });
  return monthsFequencyToDisplay;
};

const PresentationAdrien: React.FC = () => {
  const [monthFrequency, setMonthFrequency] = useState<MonthFrequency[]>([]);
  useEffect(() => {
    const getAllParticipantsAndFrenquencies = async () => {
      try {
        const monthFrequency = await api.get("/visiteur/taux-remplissage");
        setMonthFrequency(monthFrequency.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des participants et fréquences"
        );
      }
    };
    getAllParticipantsAndFrenquencies();
  }, []);
  return (
    <>
      <Row
        gutter={16}
        style={{ marginBottom: 10, margin: 24 }}
        justify="space-between"
      >
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <HeartFilled
              style={{ fontSize: 24, marginRight: 10, color: "#eb2f96" }}
            />
            <Title level={2}>
              Calendrier pour ADRIEN (NE PAS ENCORE LUI PARTAGER)
            </Title>
          </div>
          <Paragraph style={{ fontFamily: "Apple", fontSize: 16 }}>
            Coucou tout le monde ! Voici une petite application qui nous
            permettra de mieux nous organiser pour aller voir <b>Adrien</b>.
            L'objectif est de bien se répartir les week-ends pour être sur qu'il
            y ai toujours quelqu'un avec lui (le plus possible). Il lui reste
            encore quelques mois et les jours sont <b>longs</b> pour lui. Il a
            besoin de savoir qu'on est là pour lui, alors on va se motiver et{" "}
            <b>FAIRE PETER LES RESERVATIONS DE WEEK-ENDS</b> !! De ce que j'ai
            compris, il faut être maximum 2/3 personnes (dans la chambre). Pour
            l'instant comme la plus part d'entre nous travaille (enfin je
            suppose :p), j'ai mis les dates du samedi par ce que c'est aussi,{" "}
            <b>
              les jours ou Adrien peut sortir sur la terrasse de la clinique
            </b>
            . Mais si vous voulez changer, n'hésitez pas à me le dire (genre
            rajouter plus de dates). Sinon Adrien{" "}
            <b>est disponible TOUS LES JOURS</b> (sauf le dimanche), à confirmer
            avec lui, mais il me semble que c'est de préférence le matin de
            11/14h et le soir car l'apres midi il a des séances de kiné.
            <br />
            <br />
            Pour TOUTES LES FOIS où MOUMOU a su nous remonter le moral
            inconsciemment avec sa bonne humeur, il est temps de lui rendre
            l'appareil x1000!
            <br />
            <br />
            <Alert
              message="Si on repond tous présent, et que le calendrier ce rempli, alors on pourra pourra lui partager le lien pour qu'il
              puisse voir qu'on est là pour lui !!!!"
              type="error"
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <InfoCircleOutlined
                style={{ fontSize: 15, marginRight: 10, marginTop: 15 }}
              />
              <Title level={5}>INFORMATIONS IMPORTANTES !</Title>
            </div>
            Adresse de la clinique : <b>183 Rte des Camoins, 13011 Marseille</b>
            <br />
            Numéro de téléphone d'adrien : <b>06 08 32 97 81</b>
            <br />
            Numéro de téléphone de la clinique : <b>04 91 27 30 00</b>
            <br />
            Numéro de chambre : <b>223</b> (2ème étage)
            <br />
            <Divider
              style={{
                margin: " 0",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
            <Alert
              style={{ marginTop: 10 }}
              message="1 WEEK RESERVÉ = 25/20% de remplissage du mois "
              type="success"
              showIcon
            />
            <Alert
              style={{ marginBottom: 10, marginTop: 10 }}
              message="Pour réserver, il suffit de cliquer sur la date qui vous intéresse et de remplir votre nom plus bas."
              type="info"
              showIcon
            />
            <Divider
              style={{
                margin: " 0",
                marginTop: "10px",
              }}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <BarChartOutlined
                style={{ fontSize: 20, marginRight: 10, marginTop: "10px" }}
              />
              <Title level={3}>Fréquentation pour les mois à venir</Title>
            </div>
            <List
              itemLayout="horizontal"
              dataSource={setMonthFrenquencyWithPourcentage(
                monthTodisplay,
                monthFrequency
              )}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: getColorOfPourcentage(
                            item.pourcentage
                          ),
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    }
                    title={item.month}
                    description={`Taux de remplissage : ${item.pourcentage}%`}
                  />
                </List.Item>
              )}
            />
          </Paragraph>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          style={{
            textAlign: "right",
          }}
        >
          <img src={logo} alt="Adrien's Photo" style={{ maxWidth: "100%" }} />
        </Col>
      </Row>
    </>
  );
};

export default PresentationAdrien;
