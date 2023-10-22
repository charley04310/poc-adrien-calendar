import React, { useEffect, useState } from "react";
import { Alert, Avatar, Card, Input, List, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import InvitationCard from "./invitationCard";
import PresentationAdrien from "./presentation";
import api from "./axios/axios.config";
import {
  novembre,
  decembre,
  janvier,
  fevrier,
  mars,
  avril,
  mai,
  juin,
  octobre,
} from "./data/months";
import { get } from "http";
const { Title } = Typography;

export interface DateToReserve {
  date: string;
  full_date: string;
  month: string;
  day: string;
}

export interface VisiteurDate {
  nom: string;
  fullDate: string;
  date: string;
  month: string;
  day: string;
  year: string;
}

export interface MonthFrequency {
  month: string;
  jours: string;
  pourcentage: number;
  participants: string;
}

export interface VisiteurName {
  nom: string;
}
const getLitOfParticipants = async (date: string) => {
  const reponse = await api.get(`/visiteur/visite/${date}`);
  return reponse;
};

const App: React.FC = () => {
  const [openNewVisitModal, setOpenNewVisitModal] = useState(false);
  const [openListCollegueModal, setOpenListCollegueModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("octobre");
  const [dateToCome, setDateToCome] = useState<DateToReserve>();
  const [nom, setNom] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [visiteurs, setVisiteurs] = useState<VisiteurDate[]>([]);
  const [monthFrequency, setMonthFrequency] = useState<MonthFrequency[]>([]);
  const [listeOfParticipants, setListOfParticipants] = useState<
    VisiteurName[] | []
  >([]);

  useEffect(() => {
    const getAllParticipantsAndFrenquencies = async () => {
      try {
        const response = await api.get("/visiteur");
        const monthFrequency = await api.get("/visiteur/taux-remplissage");
        setMonthFrequency(monthFrequency.data);
        setVisiteurs(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des participants et fréquences"
        );
      }
    };

    getAllParticipantsAndFrenquencies();
  }, []);

  const showModal = (dateToReserve: DateToReserve) => {
    setOpenNewVisitModal(true);
    setDateToCome(dateToReserve);
  };

  const showListCollegueModal = async (dateToReserve: DateToReserve) => {
    setOpenListCollegueModal(true);
    setDateToCome(dateToReserve);
    const participants = await getLitOfParticipants(dateToReserve.date);
    setListOfParticipants(participants.data);
  };

  const postReservation = async (visiteur: VisiteurDate) => {
    const response = await api.post("/visiteur", visiteur);
    if (response.status === 201) {
      setOpenNewVisitModal(false);
      setSuccessMessage(true);
    }
    return null;
  };

  const totalParticipantsByDay = (
    day: number,
    month: string,
    visits: VisiteurDate[]
  ): string => {
    const total = visits.filter(
      (visite) => parseInt(visite.day) === day && visite.month === month
    ).length;

    return total.toString();
  };

  const tabListNoTitle = [
    {
      key: "octobre",
      label: "octobre",
    },
    {
      key: "novembre",
      label: "novembre",
    },
    {
      key: "decembre",
      label: "decembre",
    },
    {
      key: "janvier",
      label: "janvier",
    },
    {
      key: "fevrier",
      label: "fevrier",
    },
    {
      key: "mars",
      label: "mars",
    },
    {
      key: "avril",
      label: "avril",
    },
    {
      key: "mai",
      label: "mai",
    },
    {
      key: "juin",
      label: "juin",
    },
  ];

  const contentListNoTitle: Record<string, React.ReactNode> = {
    octobre: octobre.map((shift) => (
      <InvitationCard
        showListCollegueModal={() => showListCollegueModal(shift)}
        showModal={() => showModal(shift)}
        date={shift.date}
        fullDate={shift.full_date}
        nbParticipants={totalParticipantsByDay(
          parseInt(shift.day),
          "Octobre",
          visiteurs
        )}
      />
    )),

    novembre: novembre.map((shift) => (
      <InvitationCard
        showListCollegueModal={() => showListCollegueModal(shift)}
        showModal={() => showModal(shift)}
        date={shift.date}
        fullDate={shift.full_date}
        nbParticipants={totalParticipantsByDay(
          parseInt(shift.day),
          "Novembre",
          visiteurs
        )}
      />
    )),

    decembre: decembre.map((shift) => (
      <InvitationCard
        showListCollegueModal={() => showListCollegueModal(shift)}
        showModal={() => showModal(shift)}
        date={shift.date}
        fullDate={shift.full_date}
        nbParticipants={totalParticipantsByDay(
          parseInt(shift.day),
          "Décembre",
          visiteurs
        )}
      />
    )),
    janvier: janvier.map((date) => (
      <InvitationCard
        showListCollegueModal={() => showListCollegueModal(date)}
        showModal={() => showModal(date)}
        date={date.date}
        fullDate={date.full_date}
        nbParticipants={totalParticipantsByDay(
          parseInt(date.day),
          "Janvier",
          visiteurs
        )}
      />
    )),

    fevrier: fevrier.map((date) => (
      <InvitationCard
        showListCollegueModal={() => showListCollegueModal(date)}
        showModal={() => showModal(date)}
        date={date.date}
        fullDate={date.full_date}
        nbParticipants={totalParticipantsByDay(
          parseInt(date.day),
          "Février",
          visiteurs
        )}
      />
    )),
    mars: mars.map((date) => (
      <InvitationCard
        showListCollegueModal={() => showListCollegueModal(date)}
        showModal={() => showModal(date)}
        date={date.date}
        fullDate={date.full_date}
        nbParticipants={totalParticipantsByDay(
          parseInt(date.day),
          "Mars",
          visiteurs
        )}
      />
    )),

    avril: avril.map((date) => (
      <InvitationCard
        showListCollegueModal={() => showListCollegueModal(date)}
        showModal={() => showModal(date)}
        date={date.date}
        fullDate={date.full_date}
        nbParticipants={totalParticipantsByDay(
          parseInt(date.day),
          "Avril",
          visiteurs
        )}
      />
    )),

    mai: mai.map((date) => (
      <InvitationCard
        showListCollegueModal={() => showListCollegueModal(date)}
        showModal={() => showModal(date)}
        date={date.date}
        fullDate={date.full_date}
        nbParticipants={totalParticipantsByDay(
          parseInt(date.day),
          "Mai",
          visiteurs
        )}
      />
    )),

    juin: juin.map((date) => (
      <InvitationCard
        showListCollegueModal={() => showListCollegueModal(date)}
        showModal={() => showModal(date)}
        date={date.date}
        fullDate={date.full_date}
        nbParticipants={totalParticipantsByDay(
          parseInt(date.day),
          "Juin",
          visiteurs
        )}
      />
    )),
  };

  const onTabChange = (key: string) => {
    setActiveKey(key);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenNewVisitModal(false);
  };

  const handleListCollegueCancel = () => {
    setOpenListCollegueModal(false);
  };

  const handleListCollegueOk = () => {
    setOpenListCollegueModal(false);
  };

  const handleOk = async (dateToReserve: DateToReserve, nom: string) => {
    if (!nom || nom.length === 0) {
      return;
    }

    const visiteurDate: VisiteurDate = {
      nom,
      fullDate: dateToReserve.full_date,
      date: dateToReserve.date,
      month: dateToReserve.month,
      day: dateToReserve.day,
      year: "2023",
    };

    console.log(`Clicked ok button $visiteurDate`, visiteurDate);
    postReservation(visiteurDate);
    const updatedVisiteurs = [...visiteurs, visiteurDate];
    setVisiteurs(updatedVisiteurs);
  };

  return (
    <>
      <PresentationAdrien />

      {successMessage && (
        <Alert
          style={{ marginBottom: 10, margin: 24 }}
          message={`Merci ${nom} votre créneau est réservé avec succès`}
          type="success"
        />
      )}

      <Title style={{ marginBottom: 10, margin: 24 }} level={3}>
        S'inscrire pour venir voir Adrien
      </Title>
      <Card
        style={{ marginBottom: 10, margin: 24 }}
        tabList={tabListNoTitle}
        activeTabKey={activeKey}
        tabBarExtraContent={<a href="#">Clinique</a>}
        onTabChange={onTabChange}
        tabProps={{
          size: "middle",
        }}
      >
        {contentListNoTitle[activeKey]}
      </Card>
      <Modal
        title={`Venir voir Adrien le ${dateToCome?.date}`}
        open={openNewVisitModal}
        onOk={() => handleOk(dateToCome!, nom)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          size="large"
          placeholder="Votre nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          prefix={<UserOutlined />}
        />
      </Modal>
      <Modal
        title={`Liste des collegues pour le ${dateToCome?.date}`}
        open={openListCollegueModal}
        onOk={handleListCollegueOk}
        confirmLoading={confirmLoading}
        onCancel={handleListCollegueCancel}
      >
        <List
          size="small"
          bordered
          dataSource={listeOfParticipants}
          renderItem={(item) => (
            <List.Item>
              <Avatar
                style={{
                  backgroundColor: "#fde3cf",
                  color: "#f56a00",
                  marginRight: 10,
                }}
              >
                {item.nom[0]}
              </Avatar>
              {item.nom}
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default App;
