import React from 'react';
import styled from 'styled-components';

const Card = props => (
	<Container>
		<Cover>
			<Image src={require('../../assets/img/bag.jpg')} />
		</Cover>
		<Content>
			<Title>Bag</Title>
		</Content>
	</Container>
);

export default Card;

const Container = styled.div`
	background: #efefef;
	height: 23vh;
	width: 20vh;
	border-radius: 14px;
	margin: 4%;
	margin-top: 0px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.div`
	width: 100%;
	height: 120px;
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
	overflow: hidden;
`;

const Image = styled.img`
	width: 100%;
    height: 100%;
    border-radius: 3vh;
`;

const Content = styled.div`
	padding-top: 10px;
	flex-direction: column;
	align-items: center;
    height: 60px;
    padding-bottom: -10%;
`;

const Title = styled.p`
	color: #3c4560;
	font-size: 20px;
    font-weight: 600;
    text-align: center;
`;