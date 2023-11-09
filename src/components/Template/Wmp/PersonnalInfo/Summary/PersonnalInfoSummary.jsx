import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import GlobalSpinner from '../../../../Global/Spinner';

// https://lingash.medium.com/how-to-maintain-state-and-scroll-position-in-react-4baa5dea0ce

function PersonnalInfoSummary(prop) {
  const [records, setRecords] = useState(prop.records);
  const [scrollPosition, setScrollPosition] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef();

  const hasRecords = records && records?.length > 0;

  useEffect(() => {
    if (location.state) {
      const { records, scrollPosition } = location.state;
      setRecords(records);
      setTimeout(() => {
        scrollRef.current.scrollTop = scrollPosition
      }, (10));
    }
  }, []);

  useEffect(() => {
    setRecords(prop.records);
  }, [prop.records]);

  const onDetail = (id) => {
    navigate(`/wmp/personnalinfo/${id}`, { state: { records: records, scrollPosition } })
  }

  const onScroll = (e) => {
    setScrollPosition(e.target.scrollTop)
  };

  if ((prop.fetchLoading === false) && (hasRecords === false)) { return (<></>) }

  return (
    <>
      {
        prop.fetchLoading
          ? <Container className="mt-5">
            <GlobalSpinner msg="Loading Summary List..." />
          </Container>
          : <Container className="mt-5" ref={scrollRef} onScroll={onScroll} style={{ height: '400px', overflowY: 'auto' }}>
            <h5 className='title'>Summary List</h5>
            <Table>
              <thead><tr><th></th><th>Username</th><th>First</th><th>Last</th></tr></thead>
              <tbody>
                {
                  records && records.map((record) => {
                    return (
                      <tr key={record.ppms_Id}>
                        <td><Button size="sm" type="button" onClick={(e) => onDetail(record.ppms_Id)}>Detail</Button></td>
                        <td>{record.username}</td>
                        <td>{record.fname}</td>
                        <td>{record.lname}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Container>

      }
    </>
  )
}

export default PersonnalInfoSummary;