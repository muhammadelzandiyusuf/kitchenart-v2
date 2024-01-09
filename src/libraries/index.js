import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import thunk from "redux-thunk";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import LoadingBar from 'react-top-loading-bar';
import Slider from "react-slick";
import NumberFormat from 'react-number-format';
import YouTube from 'react-youtube';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import Localbase from "localbase";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import MaskedInput from "react-text-mask";

export
{ React, ReactDOM, PropTypes, moment, axios, thunk, FacebookLogin, GoogleLogin, LoadingBar, Slider as SlickSlider,
    NumberFormat, YouTube, AsyncSelect, Select as SelectUi, Localbase, CopyToClipboard, Sentry, Integrations,
    MaskedInput
};

export * from "react";
export * from "react-router-dom";
export * from "redux";
export * from "react-redux";
export * from "react-hook-form";
export * from 'react-helmet-async';
export * from 'react-multi-lang';
export * from 'react-share';
export * from 'text-mask-addons';

export * from "@hookform/resolvers/yup";

export * from "./material";
export * from "./fontawesome";
export * from "./material-image";
export * as yup from "yup";