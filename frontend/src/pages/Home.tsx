import { makeStyles, Button, Title1, tokens } from '@fluentui/react-components';
import { PersonAvailableRegular, PersonBoardRegular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '40px',
        backgroundColor: tokens.colorNeutralBackground1,
    },
    title: {
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cardButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '250px',
        height: '250px',
        gap: '15px',
        fontSize: '18px',
        fontWeight: 'bold',
        boxShadow: tokens.shadow16,
        transition: 'transform 0.2s',
        ':hover': {
            transform: 'scale(1.05)',
            boxShadow: tokens.shadow28,
        },
    },
    icon: {
        fontSize: '64px',
        height: '64px',
        width: '64px',
    },
});

export const Home = () => {
    const styles = useStyles();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Title1 className={styles.title}>つくぽけ整理券管理システム</Title1>
            <div className={styles.buttonContainer}>
                <Button
                    className={styles.cardButton}
                    onClick={() => navigate('/admin')}
                    appearance="subtle"
                >
                    <PersonBoardRegular className={styles.icon} />
                    Administrator
                </Button>
                <Button
                    className={styles.cardButton}
                    onClick={() => navigate('/queue')}
                    appearance="subtle"
                >
                    <PersonAvailableRegular className={styles.icon} />
                    Check Waiting Number
                </Button>
                <Button
                    className={styles.cardButton}
                    onClick={() => navigate('/display')}
                    appearance="subtle"
                >
                    <PersonBoardRegular className={styles.icon} />
                    Display Screen
                </Button>
            </div>
        </div>
    );
};
