import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore/lite";
import { Heading, RadioButtonGroup, Notification, Chart, Box } from "grommet";
import { Card } from "grommet/components/Card";
import { CardBody } from "grommet/components/CardBody";
import React, { useEffect, useState } from "react";
import { db } from "../..";
import LabelledChart from "../../shared/LabelledChart";
import { PollDoc } from "../../shared/types";
import styled from "styled-components";

const fetchPoll = async (
  pollName: string,
  setPoll: {
    (value: React.SetStateAction<PollDoc | undefined>): void;
    (arg0: PollDoc): void;
  }
) => {
  const pollsRef = collection(db, "polls");
  try {
    const polls: PollDoc[] = [];
    const q = query(pollsRef, where("pollName", "==", pollName));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      const poll = doc.data() as PollDoc;
      polls.push(poll);
    });
    if (polls.length > 0) {
      const pollDoc = polls[0];
      setPoll(pollDoc);
    }
  } catch (error) {
    console.log("error", error);
  }
};

const Poll = ({ pollName }: { pollName: string }) => {
  const [value, setValue] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const [poll, setPoll] = useState<PollDoc | undefined>(undefined);

  useEffect(() => {
    if (!poll) {
      fetchPoll(pollName, setPoll);
    }
  }, []);

  const submitPoll = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);

    // Update in firestore
    const pollsRef = collection(db, "polls");
    const q = query(pollsRef, where("pollName", "==", pollName));
    const snapshot = await getDocs(q);
    const oldPoll = snapshot.docs[0];
    // console.log(oldPoll.data());
    // @ts-ignore any type
    const options = oldPoll.data().options.map((option) => ({
      ...option,
      count: option.label === selectedValue ? option.count + 1 : option.count,
    }));
    setDoc(
      oldPoll.ref,
      {
        ...oldPoll.data,
        options,
      },
      { merge: true }
    );
    setSuccessVisible(true);
  };

  if (!poll) {
    return null;
  }
  return (
    <>
      <Card>
        <CardBody pad="medium" align="center">
          <Heading level={2}>{poll?.label}</Heading>
          <RadioButtonGroup
            name={"poll-gif-jif"}
            options={poll?.options.map((option) => option.label)}
            value={value}
            onChange={submitPoll}
          />
          {successVisible && (
            <Notification
              toast={{
                autoClose: true,
                position: "bottom-right",
              }}
              title="Vote Submitted"
              message="Your vote has been recorded."
              onClose={() => setSuccessVisible(false)}
            />
          )}
        </CardBody>
      </Card>
      <Box>
        <Heading level={2} alignSelf="center">
          Global Votes
        </Heading>
        <Box direction="row">
          {poll.options.map((option) => (
            <LabelledChart
              label={option.label}
              value={option.count}
              color={"accent-1"}
              key={option.label}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Poll;
