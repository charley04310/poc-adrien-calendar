import React, { useEffect } from "react";
import { Avatar, Button, Card } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { Typography, Row, Col } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import api from "./axios/axios.config";
// Importez Row et Col pour créer la mise en page

const { Title } = Typography;

interface InvitationCard {
  showModal: () => void;
  showListCollegueModal: () => void;
  date: string;
  fullDate: string;
  nbParticipants: string;
}

const getColor = (nbParticipants: string) => {
  if (parseInt(nbParticipants) === 0) {
    return "red";
  }
  return "green";
};

const InvitationCard: React.FC<InvitationCard> = ({
  showModal,
  showListCollegueModal,
  date,
  fullDate,
  nbParticipants,
}) => {
  const isDateIsValid = (date: string) => {
    const today = new Date();
    const dateToCompare = new Date(date);
    if (dateToCompare < today) {
      console.log("isNot Valid Date", dateToCompare);
      return false;
    }
    console.log("isValide Date :", dateToCompare);
    return true;
  };

  const isValide = isDateIsValid(date);

  return (
    <Card
      title={`Réserver pour ${fullDate.toLowerCase()}`}
      bordered={false}
      style={{
        borderRadius: 10,
        boxShadow: "0 0 10px rgba(0,0,0,.2)",
        margin: 0,
        marginTop: 10,
      }}
    >
      <Row gutter={16} style={{ marginBottom: 10 }}>
        <Avatar
          style={{ backgroundColor: getColor(nbParticipants) }}
          icon={<HeartFilled />}
          size={20}
        />
        <Title style={{ color: "black", margin: 0, marginLeft: 15 }} level={5}>
          Clinique St Martin
        </Title>
      </Row>
      <Row gutter={16} style={{ marginBottom: 10 }}>
        <Col span={14}>
          Ami(e-s) présent(s): <b>{nbParticipants}</b>
        </Col>
        {isValide && (
          <Col span={8}>
            <Button
              type="primary"
              onClick={showModal}
              style={{
                backgroundColor: "#52c41a",
                marginRight: 10,
                marginBottom: 5,
              }}
            >
              Reserver
            </Button>
            <Button
              type="primary"
              onClick={() => showListCollegueModal()}
              style={{
                backgroundColor: "grey",
                marginBottom: 5,
              }}
            >
              Collègues
            </Button>
          </Col>
        )}
        {!isValide && (
          <Col span={8}>
            <Button
              type="primary"
              onClick={() => showListCollegueModal()}
              style={{
                backgroundColor: "grey",
                marginBottom: 5,
                marginRight: 10,
              }}
            >
              Collègues
            </Button>
            <Avatar icon={<CheckCircleTwoTone />} size={20} /> La date est
            passée
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default InvitationCard;
