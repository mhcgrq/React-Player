import React, { PureComponent } from 'react';
import axios from 'axios';
import { Subject, Observable } from 'rxjs';
import Sound from 'react-sound';
import Search from './component/Search';
import PlayList from './component/PlayList';
import Info from './component/Info';
import Progress from './component/Progress';
import Player from './component/Player';
import '../scss/style.scss';

const clientId = '632ae790e42397409c1b685aed76b562';

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.search$ = new Subject();
        this.state = {
            searchSuggestions: [],
            playListSuggestions: [],
            searchInputValue: '',
            playListInputValue: '',
            track: {
                artwork_url: 'https://i1.sndcdn.com/artworks-000136681606-vf17k0-t200x200.jpg',
                title: 'EXID HOT PINK',
                stream_url: 'https://api.soundcloud.com/tracks/233800130/stream',
            },
            playList: [{
                artwork_url: 'https://i1.sndcdn.com/artworks-000136681606-vf17k0-t200x200.jpg',
                title: 'EXID HOT PINK',
                stream_url: 'https://api.soundcloud.com/tracks/233800130/stream',
            }],
            playStatus: Sound.status.STOPPED,
            loop: false,
            random: false,
            playFromPosition: 0,
            playListPosition: 0,
            elapsed: '00:00',
            total: '00:00',
            position: 0,
        };
    }
    componentDidMount() {
        this.search$
            .switchMap(value => Observable.fromPromise(axios.get(`https://api.soundcloud.com/tracks?client_id=${clientId}&q=${value}`)))
            .subscribe((res) => { this.setState({ searchSuggestions: res.data }); });
    }
    componentWillUnmount() {
        this.search$.unsubscribe();
    }
    // url拼接
    prepareUrl = (url) => {
        return `${url}?client_id=${clientId}`;
    }
    /*
     *
     *以下是播放控制的相关方法
     *
     */
    // 播放暂停控制
    togglePlayState = () => {
        if (this.state.playStatus === Sound.status.PLAYING) {
            this.setState({ playStatus: Sound.status.PAUSED });
        } else {
            this.setState({ playStatus: Sound.status.PLAYING });
        }
    }
    // 停止播放
    stop = () => {
        this.setState({ playStatus: Sound.status.STOPPED });
    }
    // 单曲循环控制
    loopState = () => {
        if (this.state.loop === true) {
            this.setState({ loop: false });
        } else {
            this.setState({ loop: true });
        }
    }
    // 随机播放
    randomState = () => {
        if (this.state.random === true) {
            this.setState({ random: false });
        } else {
            this.setState({ random: true });
        }
    }
    // 播放完成后控制
    handleSongFinished = () => {
        if (this.state.loop) {
            this.setState({ playFromPosition: 0 });
        } else if (this.state.random) {
            const playListLength = this.state.playList.length;
            const randomIndex = Math.floor((Math.random() * playListLength));
            this.setState({
                playListPosition: randomIndex,
                track: this.state.playList[randomIndex],
            });
        } else {
            if (this.state.playListPosition === this.state.playList.length) {
                this.setState({ playListPosition: this.state.playListPosition + 1 });
            } else {
                this.setState({ playListPosition: 0 });
            }
        }
    }
    //  上一首
    backward = () => {
        if (this.state.playListPosition === 0) {
            this.setState({ playListPosition: this.state.playList.length - 1 });
        } else {
            this.setState({ playListPosition: this.state.playListPosition - 1 });
        }
        this.setState({ track: this.state.playList[this.state.playListPosition] });
    }
    //  下一首
    forward = () => {
        if (this.state.playListPosition === this.state.playList.length - 1) {
            this.setState({ playListPosition: 0 });
        } else {
            this.setState({ playListPosition: this.state.playListPosition + 1 });
        }
        this.setState({ track: this.state.playList[this.state.playListPosition] });
    }
    // 格式化时间显示
    formatMilliseconds = (milliseconds) => {
        let temp = milliseconds;
        temp %= 3600000;
        const minutes = Math.floor(temp / 60000);
        temp %= 60000;
        const seconds = Math.floor(temp / 1000);
        const time = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        return time;
    }
    //  设置已播放时间
    handleSongPlaying = (audio) => {
        this.setState({
            elapsed: this.formatMilliseconds(audio.position),
            total: this.formatMilliseconds(audio.duration),
            position: audio.position / audio.duration,
        });
    }
    //  获取搜索框中的输入值并传入state
    handleSearchInputChange = (e) => {
        if (e.target.value !== '') {
            this.setState({ searchInputValue: e.target.value });
            this.search$.next(e.target.value);
        } else {
            this.setState({
                searchSuggestions: [],
                searchInputValue: '',
            });
        }
    }
    //  点击suggsetion中的条目时，处理该项
    handleSearchSelect = (e) => {
        let i;
        //  将ul转换为数组，并判断当前选择的是第几项
        const nodeList = Array.prototype.slice.call(e.target.parentNode.childNodes);
        for (i = 0; i < nodeList.length; i++) {
            if (nodeList[i] === e.target) break;
        }
        //  保存选定项的信息，并清空其他
        const track = this.state.searchSuggestions[i];
        track.artwork_url = track.artwork_url.replace(/large/, 't200x200');
        const playList = this.state.playList;
        playList.push(track);
        this.setState({
            searchSuggestions: [],
            searchInputValue: '',
            track,
            playList,
        });
    }
    /*
     *
     *以下是关于从播放列表获取收据以及搜索的相关方法
     *
     */
    handlePlayListInputChange = (e) => {
        const value = e.target.value;
        if (value !== '') {
            let match = [];
            for (let i = 0; i < this.state.playList.length; i++) {
                const result = this.state.playList[i].title.match(new RegExp(value, 'gi'));
                match[i] = [(result === null ? 0 : result.length), this.state.playList[i]];
            }
            match = match.filter((item) => item[0] !== 0);
            match.sort((a, b) => b[0] - a[0]);
            const playListSuggestions = [];
            for (let i = 0; i < match.length; i++) {
                playListSuggestions[i] = match[i][1];
            }
            this.setState({
                playListInputValue: value,
                playListSuggestions,
            });
        } else {
            this.setState({
                playListInputValue: '',
                playListSuggestions: [],
            });
        }
    }
    handlePlayListSelect = (e) => {
        let i;
        //  将ul转换为数组，并判断当前选择的是第几项
        const nodeList = Array.prototype.slice.call(e.target.parentNode.childNodes);
        for (i = 0; i < nodeList.length; i++) {
            if (nodeList[i] === e.target) break;
        }
        //  保存选定项的信息，并清空其他
        if (this.state.playListSuggestions.length !== 0) {
            const track = this.state.playListSuggestions[i];
            this.setState({
                playListInputValue: '',
                playListSuggestions: [],
                track,
            });
        } else {
            const track = this.state.playList[i];
            this.setState({
                playListInputValue: '',
                playListSuggestions: [],
                track,
            });
        }
        document.querySelector('#player .play').click();
        document.querySelector('#player .play .iconfont').click();
    }
    render() {
        return (
            <div id="container">
                <Search
                    handleInputChange={this.handleSearchInputChange}
                    suggestions={this.state.searchSuggestions}
                    handleSelect={this.handleSearchSelect}
                    inputValue={this.state.searchInputValue}
                />
                <PlayList
                    handleInputChange={this.handlePlayListInputChange}
                    suggestions={this.state.playListSuggestions}
                    handleSelect={this.handlePlayListSelect}
                    inputValue={this.state.playListInputValue}
                    playList={this.state.playList}
                />
                <Info
                    cover={this.state.track.artwork_url}
                    title={this.state.track.title}
                />
                <Progress
                    elapsed={this.state.elapsed}
                    total={this.state.total}
                    position={this.state.position}
                />
                <Sound
                    url={this.prepareUrl(this.state.track.stream_url)}
                    playStatus={this.state.playStatus}
                    onPlaying={this.handleSongPlaying}
                    playFromPosition={this.state.playFromPosition}
                    onFinishedPlaying={this.handleSongFinished}
                />
                <Player
                    loopState={this.loopState}
                    backward={this.backward}
                    togglePlayState={this.togglePlayState}
                    forward={this.forward}
                    randomState={this.randomState}
                />
            </div>
        );
    }
}
