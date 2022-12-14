import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMission, joinMission } from '../redux/missions/missions';
import './Mission.modules.css';

const Missions = () => {
  const missions = useSelector((state) => state.missions.missionList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (missions.length === 0) {
      dispatch(fetchMission());
    }
  }, [dispatch]);

  const handleClick = ({ target }) => {
    const { type, id } = target.dataset;
    const payload = { type, id };
    dispatch(joinMission(payload));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Mission</th>
            <th>Description</th>
            <th>Status</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr className="mission-container" key={mission.id}>
              <td className="name-field">{mission.name}</td>
              <td className="description-field">{mission.description}</td>
              <td className="status-field">
                <p className={mission.join ? 'active' : ''}>
                  {mission.join ? 'Active Member' : 'NOT A MEMBER'}
                </p>
              </td>
              <td className="action-container">
                <button
                  type="button"
                  data-id={mission.id}
                  data-type={mission.join ? 'leave' : 'join'}
                  className={mission.join ? 'active' : 'btn'}
                  onClick={handleClick}
                >
                  {mission.join ? 'Leave Mission' : 'Join Mission'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Missions;
