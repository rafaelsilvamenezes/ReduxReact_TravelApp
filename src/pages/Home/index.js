import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReserveRequest } from '../../store/modules/reserve/actions';
import { MdFlightTakeoff } from "react-icons/md";

import api from "../../services/api";
import "./style.css";

export default function Home({history}) {
  const dispatch = useDispatch();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function loadApi() {
      const response = await api.get("trips");
      setTrips(response.data);
      console.log(response.data);
    }
    loadApi();
  }, []);

  function handleAdd(id) {
    dispatch(addReserveRequest(id));

    
  }

  return (
    <div>
      <div className="box">
        {trips.map((trip) => (
          <li key={trip.id}>
            <div className="flip-card"> {/*Criação do efeito flip */}
              <div className="flipper-card-inner"> {/* Parte traseira da imagem */}
                <img src={trip.image} alt={trip.title} />
              </div>
              <div className="flipper-card-front"> {/* Parte frontal da imagem*/}
                <img src={trip.inner_img} alt={trip.title} />
              </div>
            </div>
            <strong>{trip.title}</strong>
            <span>
              {trip.status ? "Viagem disponivel" : "Sem disponibilidade"}
            </span>
            <button type="button" onClick={() => handleAdd(trip.id)}>
              <div>
                <MdFlightTakeoff size={16} color="#FFF" />
              </div>
              <span>Solicitar reserva</span>
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}
