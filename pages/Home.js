import { Typography } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { insertConference, conferenceCollection } from '/imports/api/conference';

const ConferenceContainer = () => {
  const conferences = useTracker(() => {
    Meteor.subscribe('conferences'); 
    return conferenceCollection.find().fetch(); //read DB
  });

  return (
    <div>
      {conferences.length > 0 ? (
        conferences.map((conference) => (
          <div key={conference._id}>
            <Typography variant="h6">Session ID: {conference.sessionID}</Typography>
            {/* Add more details as we want - just for example purposes */}
          </div>
        ))
      ) : (
        <Typography variant="body1">No conferences found.</Typography>
      )}
    </div>
  );
};

const Home = () => {
  const [formData, setFormData] = useState({
    sessionID: '',
    delegates: [],
    dias: [],
    DMs: [],
    motions: [],
    speakers: [],
    workingGroups: [],
    status: 'formal',
  });

  useEffect(() => {
    // Fetch all conferences when the component mounts
    const allConferences = conferenceCollection.find().fetch();
    console.log('All Conferences:', allConferences);

    if (allConferences.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        sessionID: allConferences[0].sessionID,
      }));
    }
  }, []); // The empty dependency array ensures this effect runs only once on mount

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting form...');
    try {
      await insertConference(formData);
      console.log('Form submitted successfully!');
      setFormData({
        sessionID: '',
        delegates: [],
        dias: [],
        DMs: [],
        motions: [],
        speakers: [],
        workingGroups: [],
        status: 'formal',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="conferenceTest">
       <h1>Conference Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Session ID:
          <input
            type="text"
            value={formData.sessionID}
            onChange={(e) => handleInputChange('sessionID', e.target.value)}
          />
        </label>

        {/* Delegates */}
        <label>
          Delegates:
          {formData.delegates.map((delegate, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Country"
                value={delegate.country || ''}
                onChange={(e) => handleInputChange('delegates', updateArray(formData.delegates, index, { country: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Role Call"
                value={delegate.roleCall || ''}
                onChange={(e) => handleInputChange('delegates', updateArray(formData.delegates, index, { roleCall: e.target.value }))}
              />
            </div>
          ))}
          <button type="button" onClick={() => handleInputChange('delegates', [...formData.delegates, { country: '', roleCall: '' }])}>
            Add Delegate
          </button>
        </label>

        {/* Dias */}
        <label>
          Dias:
          {formData.dias.map((dia, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="User"
                value={dia.user || ''}
                onChange={(e) => handleInputChange('dias', updateArray(formData.dias, index, { user: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Password"
                value={dia.pass || ''}
                onChange={(e) => handleInputChange('dias', updateArray(formData.dias, index, { pass: e.target.value }))}
              />
            </div>
          ))}
          <button type="button" onClick={() => handleInputChange('dias', [...formData.dias, { user: '', pass: '' }])}>
            Add Dia
          </button>
        </label>

        {/* DMs */}
        <label>
          DMs:
          {formData.DMs.map((dm, index) => (
            <div key={index}>
              {/* Similar approach for DMs */}
            </div>
          ))}
          <button type="button" onClick={() => handleInputChange('DMs', [...formData.DMs, { /* Default values */ }])}>
            Add DM
          </button>
        </label>

        {/* Motions */}
        <label>
          Motions:
          {formData.motions.map((motion, index) => (
            <div key={index}>
              {/* Similar approach for Motions */}
            </div>
          ))}
          <button type="button" onClick={() => handleInputChange('motions', [...formData.motions, { /* Default values */ }])}>
            Add Motion
          </button>
        </label>

        {/* Speakers */}
        <label>
          Speakers:
          {formData.speakers.map((speaker, index) => (
            <div key={index}>
              {/* Similar approach for Speakers */}
            </div>
          ))}
          <button type="button" onClick={() => handleInputChange('speakers', [...formData.speakers, { /* Default values */ }])}>
            Add Speaker
          </button>
        </label>

        {/* Working Groups */}
        <label>
          Working Groups:
          {formData.workingGroups.map((wg, index) => (
            <div key={index}>
              {/* Similar approach for Working Groups */}
            </div>
          ))}
          <button type="button" onClick={() => handleInputChange('workingGroups', [...formData.workingGroups, { /* Default values */ }])}>
            Add Working Group
          </button>
        </label>

        {/* Status */}
        <label>
          Status:
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
          >
            <option value="formal">Formal</option>
            <option value="informal">Informal</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    
          {/* Render the container with the fetched conference data */}
          <ConferenceContainer sessionID={formData.sessionID} />
    </div>
    
  );
};

export default Home;