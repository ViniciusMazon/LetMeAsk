import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import deleteImg from '../assets/images/delete.svg';

import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';


type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      try {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        toast.success('Pergunta removida com sucesso');
      } catch (err) {
        toast.error('Não foi possível remover a pergunta');
      }
    }
  }

  async function handleEndRoom() {
    try {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date()
      });
      toast.success('Sala foi encerrada');
      history.push('/');
    } catch (error) {
      toast.error('Ops... não conseguimos encerrar sua sala no momento');
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="let me ask logo" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question key={question.id} content={question.content} author={question.author}>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}
