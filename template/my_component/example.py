import streamlit as st
import os
import streamlit.components.v1 as components
import random

parent_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(parent_dir, "frontend/build")
_component_func = components.declare_component("extremely_serious_toaster", path=build_dir)

def extremely_serious_toaster(name, maxWidth=150, time=0, key=None):
    component_value = _component_func(name=name, maxWidth=maxWidth, time=time, key=key)

    # We could modify the value returned from the component if we wanted.
    # There's no need to do this in our simple example - but it's an option.
    return component_value


# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run my_component/example.py`

st.subheader("Component with constant args")

# Create an instance of our component with a constant `name` arg, and
# print its output value.
if st.button('click me', 123):
    extremely_serious_toaster("<a href='https://www.yandex.ru'>Здравствуйте, а что здеся</a>", 200, 0, random.randint(0, 1000))

if st.button('click me', 456):
    extremely_serious_toaster("Курс FX Spot по валютной паре EUR/RUB вырос на 4.05% по итогам последнего дня. <a href='https://www.google.com'>По направлению куда следует!</a>", 100, 3000, random.randint(0, 1000))
